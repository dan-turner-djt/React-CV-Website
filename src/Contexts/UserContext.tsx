import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { FC, ReactNode, createContext } from "react";
import { useEffect, useState } from 'react';

export type UserContextProps = {
  loggedIn: boolean;
};

export const UserContext = createContext<UserContextProps>({loggedIn: false});

export type UserContextProviderProps = {
  children: ReactNode;
};

export const UserContextProvider: FC<UserContextProviderProps> = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    })
    
    return unsubAuth;
  }, []);
  
  return (
    <UserContext.Provider value={{loggedIn}}>
      {children}
    </UserContext.Provider>
  );
};