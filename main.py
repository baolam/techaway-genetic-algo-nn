import socketio
import eventlet
import eventlet.wsgi
from flask import Flask

sio = socketio.Server()
app = Flask(__name__)

@app.route('/')
def index():
    return "Socket.IO server is running."

@sio.on('connect')
def connect(sid, environ):
    print('Client connected:', sid)
    sio.emit('message', 'Hello, client!', room=sid)

@sio.on('disconnect')
def disconnect(sid):
    print('Client disconnected:', sid)

@sio.on('message')
def message(sid, data):
    print('Message from client:', data)
    sio.emit('message', f"Echo: {data}", room=sid)

if __name__ == '__main__':
    app = socketio.Middleware(sio, app)
    eventlet.wsgi.server(eventlet.listen(('localhost', 5000)), app)
