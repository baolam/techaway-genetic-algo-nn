from core.ga.fitness import fitness_function
from core.ga.evaluate import evaluate
from core.Creature import Creature
from core.Environment import Environment
from core.ga.crossover import crossover

env = Environment()
creatures = [ Creature(str(i + 1)) for i in range(50) ]

res = evaluate(creatures, env)
# for score, creature in res:
#     print(f"Score: {score}, Creature: {creature.id}")

from core.ga.selection import selection
keep, remove = selection(res, 0.1, 0.1)
child = crossover(keep, len(creatures[0].adn()), 1, 1)
score = fitness_function(env, child.survive(env.input_params()))