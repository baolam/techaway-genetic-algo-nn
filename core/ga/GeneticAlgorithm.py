import json
from typing import List
from .fitness import fitness_function
from .evaluate import evaluate
from .selection import selection
from .crossover import crossover
from .mutate import mutate
from ..Environment import Environment
from ..Creature import Creature


class GeneticAlgorithm:
    def __init__(self, creatures : List[Creature], env : Environment):
        self.__creatures = creatures
        self.__env = env
        
        with open("resources/database/default_genetic_algorithm_infor.json", "rb") as f:
            self.__config = json.load(f)
        
        self.__adn_length = len(creatures[0].adn())
    
    def run_on_one_generation(self, generation):
        _fitness_score = evaluate(self.__creatures, self.__env)
        keep, remove = selection(_fitness_score, self.__config["remove_creature_rate"], self.__config["remove_stochastic_rate"])
        
        children = []
        for removed_creature in remove:
            child = crossover(keep, self.__adn_length, int(removed_creature.id), generation)
            children.append(child)

        keep += children
        
        keep, __ = mutate(keep, self.__config["mutation_rate"], self.__adn_length)
        self.__creatures = keep

        _best_score = _fitness_score[0][0]
        return _best_score
    
    def run_through_generation(self, generations):
        fitness_scores = []
        for generation in range(generations):
            fitness_score = self.run_on_one_generation(generation)
            fitness_scores.append(fitness_score)
        return fitness_scores