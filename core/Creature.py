from typing import List
from .constant import NUM_INPUTS
from .constant import NUM_OUTPUTS
from .NeuralNetwork import NeuralNetwork
from .utils.math_function import sigmoid

output_activations = [sigmoid, sigmoid, sigmoid]

class Creature:
    """
    A class representing a creature in the environment
    """

    def __init__(self, id, generation_number = 1, adn : List[float] = None):
        self.__strategy = NeuralNetwork(NUM_INPUTS, NUM_OUTPUTS)
        self.id = id
        self.generation_number = generation_number
        self.ancestors = []
        self.mutatated_position = []

        if adn is not None:
            self.__strategy.update_weight(adn)

    def survive(self, x) -> List[float]:
        z = self.__strategy.predict(x)
        
        y = []
        for activation, item in zip(output_activations, z):
            r = activation(item).tolist()
            y.append(r)
        
        return y
    
    def adn(self):
        return self.__strategy.get_weight
    
    def update_adn(self, adn):
        self.__strategy.update_weight(adn)
    
    def __lt__(self, other):
        return self.generation_number < other.generation_number
    
    def infor(self):
        return {
            "id": self.id,
            "generation_number": self.generation_number,
            "ancestors": self.ancestors,
            "mutatated_position": self.mutatated_position,
            "adn" : self.adn()
        }