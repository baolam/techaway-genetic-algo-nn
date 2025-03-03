from core.ga.GeneticAlgorithm import GeneticAlgorithm
from core.Creature import Creature
from core.Environment import Environment

env = Environment()
creatures = [  Creature(str(i + 1)) for i in range(100) ]

ga = GeneticAlgorithm(creatures, env)
hist = ga.run_through_generation(500, show=True, storaged_name="test_algorithm")