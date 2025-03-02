import random
from typing import List, Tuple
from ..Creature import Creature


def crossover(kept_creatures : List[Creature], adn_length : int, removed_idx : int, generation : int) -> Creature:
    """Cross over the kept creatures with the removed creatures."""
    # Select two random creatures from the kept creatures
    parent1 = random.choice(kept_creatures)
    parent2 = random.choice(kept_creatures)
    # Cắt gen (trao đổi đoạn gen)
    k = random.randint(0, adn_length - 1)
    adn = parent1.adn()[:k] + parent2.adn()[k:]
    # Tạo con mới
    child = Creature(str(removed_idx), generation + 1, adn)
    child.ancestors.append(parent1.id)
    child.ancestors.append(parent2.id)
    return child
