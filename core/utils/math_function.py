import numpy as np
from ..constant import FIGHTING_THRESHOLD

def sigmoid(x):
    return 1 / (1 + np.exp(-x))

def should_fight(x):
    return sigmoid(x) > FIGHTING_THRESHOLD