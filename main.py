import socketio
import eventlet
import eventlet.wsgi
from flask import Flask

# Tới phần cài đặt thuật toán
from core.Creature import Creature
from core.Environment import Environment
from core.constant import NUM_CREATURES
from core.ga.fitness import fitness_function

class FindStrategy:
    def __init__(self, srv):
        self.creatures = [ Creature(str(i + 1)) for i in range(NUM_CREATURES) ]
        self.environment = Environment()
        self.srv = srv
        
    def update_infor_environment(self, data):
        try:
            msg = []
            
            msg.append(self.environment.update_temperature(float(data["temperature"])))
            msg.append(self.environment.update_humidity(float(data["humidity"])))
            msg.append(self.environment.update_percentage_food(float(data["percen_foods"])))
            msg.append(self.environment.update_rainfall(float(data["rainfall"])))
            msg.append(self.environment.update_atmospheric_pressure(float(data["atmos_pressure"])))
            msg.append(self.environment.update_wind_speed(float(data["wind_speed"])))
            msg.append(self.environment.update_ph(float(data["ph"])))
            msg.append(self.environment.update_energy(float(data["energy"])))

            messages = [ message for message in msg if message is not None ]
            if len(messages) == 0:
                self.srv.emit("update_environment_status", { "success" : True })
            else:
                self.srv.emit("update_environment_status", { "success" : False, "error" : messages })

        except Exception as e:
            print(e)
            self.srv.emit("update_environment_status", { "success" : False, "error" : [str(e)] })

    def access_strategy_by_id(self, _id):
        creature = self.creatures[int(_id) - 1]
        strategy = creature.survive(
            self.environment.input_params()
        )

        infor = {
            "strategy" : {
                "should_fight" : strategy[2],
                "food_sense" : strategy[0],
                "energy_level" : strategy[1]
            },
            "creature_id" : _id,
            "adn" : creature.weight(),
            "generation" : creature.generation_number,
            "ancestors" : creature.ancestors,
            "fitness" : fitness_function(self.environment, strategy)
        }

        self.srv.emit("creature_strategy", infor)


sio = socketio.Server()
app = Flask(__name__)
strategy = FindStrategy(sio)

@app.route('/')
def index():
    return "Socket.IO server is running."

@sio.on('connect')
def connect(sid, environ):
    print("Có kết nối....")

@sio.on('disconnect')
def disconnect(sid):
    print("Mất kết nối rùi!>...")

@sio.on('update_environment')
def update_environment(sid, data):
    strategy.update_infor_environment(data)

@sio.on('creature_strategy')
def creature_strategy(sid, data):
    strategy.access_strategy_by_id(data)

if __name__ == '__main__':
    app = socketio.Middleware(sio, app)
    eventlet.wsgi.server(eventlet.listen(('localhost', 5000)), app)
