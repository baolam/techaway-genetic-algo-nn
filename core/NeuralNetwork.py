import numpy as np

class NeuralNetwork:
    """
    A simple neural network, use to simulate the behavior of creature.
    Can be viewed as a strategy.
    """
    
    HIDDEN_SIZE = 4

    def __init__(self, input_dim, output_dim):
        self.__input_dim = input_dim
        self.__output_dim = output_dim

        ### Thông tin về các neuron trong mạng
        self.__w1 = np.random.randn(input_dim, self.HIDDEN_SIZE)
        self.__w2 = np.random.randn(self.HIDDEN_SIZE, output_dim)

    @property
    def input_dim(self):
        return self.__input_dim

    @property
    def output_dim(self):
        return self.__output_dim
    
    def predict(self, x) -> np.ndarray:
        """
        Predict the output of the network given the input x.
        """
        z = np.dot(x, self.__w1)
        z = np.tanh(z)
        z = np.dot(z, self.__w2)
        return z

    @property
    def get_weight(self):
        return self.__w1, self.__w2
    
    def update_weight(self, w1, w2):
        self.__w1 = w1
        self.__w2 = w2