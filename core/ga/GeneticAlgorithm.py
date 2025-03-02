import json
import os
from typing import List, Callable
from tqdm import tqdm
from .evaluate import evaluate
from .selection import selection
from .crossover import crossover
from .mutate import mutate
from ..Environment import Environment
from ..Creature import Creature

STORAGE_PATH = "resources/database"

class GeneticAlgorithm:

    def __init__(self, creatures : List[Creature], env : Environment):
        self.__creatures = creatures
        self.__env = env
        
        with open("resources/database/default_genetic_algorithm_infor.json", "rb") as f:
            self.__config = json.load(f)
        with open("resources/database/general_config.json", "rb") as f:
            self.__num_generations = json.load(f)["num_saved_generation"]

        self.__adn_length = len(creatures[0].adn())
    
    def run_on_one_generation(self, generation):
        generation_infor = {
            "generation" : generation,
            "final_population" : {},
            "best_fitness" : 0
        }

        _fitness_score = evaluate(self.__creatures, self.__env)
        keep, remove = selection(_fitness_score, self.__config["remove_creature_rate"], self.__config["remove_stochastic_rate"])
        
        children = []
        for removed_creature in remove:
            child = crossover(keep, self.__adn_length, int(removed_creature.id), generation)
            children.append(child)

        creatures = keep + children
        
        creatures = mutate(creatures, self.__config["mutation_rate"], self.__adn_length)
        self.__creatures = creatures

        for creature in creatures:
            generation_infor["final_population"][creature.id] = creature.infor()

        _best_score = _fitness_score[0][0]
        generation_infor["best_fitness"] = _best_score
        generation_infor["best_creature"] = _fitness_score[0][1].infor()

        return generation_infor
    
    def run_through_generation(self, generations, storaged_name : str, show : bool = False, on_callback_step : Callable = None):
        folder_name = os.path.join(STORAGE_PATH, storaged_name)
        if not os.path.exists(folder_name):
            os.makedirs(folder_name)

        if show:
            _tmp = tqdm(range(1, generations + 1), desc="Generation")
        else:
            _tmp = range(1, generations + 1)
            
        for generation in _tmp:
            infor = self.run_on_one_generation(generation)

            if on_callback_step:
                on_callback_step(infor, generation)

            if generation >= generations - self.__num_generations:
                file_name = os.path.join(folder_name, f"{generation}.json")
                with open(file_name, "w") as file:
                    json.dump(infor, file, indent=4)

        overall = os.path.join(folder_name, "overall.json")
        with open(overall, "w") as f:
            infor = {
                "environment" : self.__env.infor(),
                "generations" : generations
            }
            json.dump(infor, f, indent=4)

        return folder_name
    
    def get_creatures(self):
        return self.__creatures