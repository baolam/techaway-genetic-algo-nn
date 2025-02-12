import asyncio
import websockets
from core.Environment import Environment
from core.Creature import Creature
from core.constant import NUM_CREATURES
from core.constant import WS_HOST

stop_program = False

class RunAlgorithm:
    def __init__(self):
        self.env = Environment()
        self.creatures = [ Creature() for __ in range(NUM_CREATURES) ]
        self.client = None
    
    def initalize_client(self, client : websockets.ClientConnection):
        self.client = client

    def run(self):
        pass

algorithm = RunAlgorithm()

async def connect_host():
    async with websockets.connect(WS_HOST) as websocket:
        algorithm.initalize_client(websocket)

asyncio.run(connect_host())