import random
from typing import List, Tuple
from ..Creature import Creature

def selection(evaluate_result, remove_rate, remove_stochastic_rate) -> Tuple[List[Creature], List[Creature]]:
    population = len(evaluate_result)
    remove_num = int(population * remove_rate)

    # Loại ngẫu nhiên
    theta = random.random()
    if theta >= remove_stochastic_rate:
        remove_index = random.sample(range(population), remove_num)
    else:
        remove_index = [i for i in range(population - remove_num, population)]

    keep = []
    remove = []

    for i, (__, creature) in enumerate(evaluate_result):
        if i not in remove_index:
            keep.append(creature)
        else:
            remove.append(creature)

    return keep, remove