from core.Creature import Creature
from core.Environment import Environment

env = Environment()
creature = Creature()

x = env.input_params()
y = creature.survive(x)

print(y)