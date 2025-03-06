import React, { createContext, useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import { SOCKET_SERVER } from '@Config/constants'

interface ISocketProvider {
  socket: Socket | null
  disconnectToServer: () => void
}

interface SocketProviderProps {
  children: React.ReactNode
}

const SocketContext = createContext<ISocketProvider>({
  socket: null,
  disconnectToServer: () => {},
})

const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null)

  useEffect(() => {
    const newSocket = io(SOCKET_SERVER)
    setSocket(newSocket)

    newSocket.on('disconnect', () => {
      newSocket.close()
    })

    newSocket.on('connect', () => {
      console.log('Connected to server')
    })
  }, [])

  const disconnectToServer = () => {
    if (socket) {
      socket.close()
    }
  }

  return (
    <SocketContext.Provider value={{ socket, disconnectToServer }}>
      {children}
    </SocketContext.Provider>
  )
}

export default SocketProvider
