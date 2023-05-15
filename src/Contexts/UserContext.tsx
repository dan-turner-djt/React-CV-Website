import { getAuth, onAuthStateChanged } from "firebase/auth";
import React from "react";
import { useEffect, useState } from 'react';

export type UserContextProps = {
  loggedIn: boolean;
};

export const UserContext = React.createContext<UserContextProps>({loggedIn: false});

export type UserContextProviderProps = {
  children: React.ReactNode;
};

export const UserContextProvider: React.FC<UserContextProviderProps> = ({ children }) => {
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