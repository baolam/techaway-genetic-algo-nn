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

        ### Thông tin về số chiều của w1, w2
        # self._w1_shape = self.__w1.shape
        # self._w2_shape = self.__w2.shape
        # self._w1_flatten = self.__w1.reshape(-1).shape
        # self._w2_flatten = self.__w2.reshape(-1).shape

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
        lst = []
        lst += self.__w1.reshape(-1).tolist() 
        lst += self.__w2.reshape(-1).tolist()
        return lst
    
    def update_weight(self, infor):
        slice_position = self.input_dim * self.HIDDEN_SIZE
        w1 = infor[:slice_position]
        w2 = infor[slice_position:]
        self.__w1 = np.array(w1).reshape((self.input_dim, self.HIDDEN_SIZE))
        self.__w2 = np.array(w2).reshape((self.HIDDEN_SIZE, self.output_dim))