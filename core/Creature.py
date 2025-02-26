from typing import List
from .constant import NUM_INPUTS
from .constant import NUM_OUTPUTS
from .NeuralNetwork import NeuralNetwork
from .utils.math_function import sigmoid
from .utils.math_function import should_fight

output_activations = [sigmoid, sigmoid, should_fight]

class Creature:
    """
    A class representing a creature in the environment
    """

    def __init__(self):
        self.__strategy = NeuralNetwork(NUM_INPUTS, NUM_OUTPUTS)
    
    def survive(self, x) -> List[float]:
        z = self.__strategy.predict(x)
        
        y = []
        for activation, item in zip(output_activations, z):
            r = activation(item).tolist()
            y.append(r)
        
        return y
    
    def weight(self):
        return self.__strategy.get_weight
    
    def update_weight(self, w1, w2):
        self.__strategy.update_weight(w1, w2)