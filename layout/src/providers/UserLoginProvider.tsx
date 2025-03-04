import { useAppSelector } from '@Hooks/redux.hook';
import React, { createContext, useContext } from 'react';

interface LoginProvider {
  isLogin: boolean;
}

interface UserLoginProviderProps {
  children: React.ReactNode;
}

const UserLoginContext = createContext<LoginProvider>({
  isLogin: false,
});

const UserLoginProvider: React.FC<UserLoginProviderProps> = ({ children }) => {
  const existUser = useAppSelector((state) => state.user.info !== null);
  const isLogin = localStorage.getItem('access_token') !== null && existUser;

  return (
    <UserLoginContext.Provider value={{ isLogin }}>
      {children}
    </UserLoginContext.Provider>
  );
};

export const useLogin = () => {
  return useContext(UserLoginContext);
};

export default UserLoginProvider;
