import random
from typing import List
from ..Creature import Creature

def mutate(creatures : List[Creature], mutation_rate : float, adn_length : int):
    population = len(creatures)
    mutated_length = int(mutation_rate * population)
    mutated_creatures = random.sample(creatures, mutated_length)

    for creature in mutated_creatures:
        # Chọn vị trí đột biến
        gene_index = random.randint(0, adn_length - 1)
        # Đột biến
        value = random.choice([0, 1])
        # Truy xuất adn
        adn = creature.adn()
        adn[gene_index] = value
        creature.update_adn(adn)
        creature.mutatated_position.append(gene_index)

    return creatures
