from typing import List, Tuple
from .fitness import fitness_function
from ..Environment import Environment
from ..Creature import Creature

def evaluate(creatures : List[Creature], env : Environment) -> List[Tuple[float, Creature]]:
    fitness_scores = [ (fitness_function(env, creature.survive(env.input_params())), creature) for creature in creatures ]
    fitness_scores.sort(reverse=True)   
    return fitness_scores