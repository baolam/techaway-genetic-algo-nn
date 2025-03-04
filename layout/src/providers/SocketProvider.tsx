import React, { createContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { SOCKET_SERVER } from '@Config/constants';
import { useLogin } from './UserLoginProvider';

interface SocketProvider {
  socket: Socket | null;
  disconnectToServer: () => void;
}

interface SocketProviderProps {
  children: React.ReactNode;
}

const SocketContext = createContext<SocketProvider>({
  socket: null,
  disconnectToServer: () => {},
});

const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const { isLogin } = useLogin();

  useEffect(() => {
    if (!isLogin) return;

    const token = localStorage.getItem('access_token');
    const newSocket = io(SOCKET_SERVER, {
      extraHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    setSocket(newSocket);

    newSocket.on('disconnect', () => {
      newSocket.close();
    });
  }, []);

  const disconnectToServer = () => {
    if (socket) {
      socket.close();
    }
  };

  return (
    <SocketContext.Provider value={{ socket, disconnectToServer }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
