from core.ga.GeneticAlgorithm import GeneticAlgorithm
from core.Creature import Creature
from core.Environment import Environment

env = Environment()
creatures = [  Creature(str(i + 1)) for i in range(100) ]

ga = GeneticAlgorithm(creatures, env)
hist = ga.run_through_generation(500, show=True)
# ga.run_on_one_generation(1)
# ga.run_on_one_generation(2)

import matplotlib.pyplot as plt
plt.plot(hist)
plt.show()