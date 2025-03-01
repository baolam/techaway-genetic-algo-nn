from core.ga.evaluate import evaluate
from core.Creature import Creature
from core.Environment import Environment

env = Environment()
creatures = [ Creature(str(i + 1)) for i in range(50) ]

res = evaluate(creatures, env)
for score, creature in res:
    print(f"Score: {score}, Creature: {creature.id}")

from core.ga.selection import selection
keep, remove = selection(res, 0.1, 0.1)
print(len(keep))
print(len(remove))