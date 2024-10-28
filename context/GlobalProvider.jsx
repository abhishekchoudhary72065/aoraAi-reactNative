import React, { useContext, createContext, useState, useEffect } from "react";
import { getCurrentUser } from "../lib/appwrite";

const globalContext = createContext();
export const useGlobalContext = () => useContext(globalContext);

const GlobalProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCurrentUser()
      .then((user) => {
        if (user) {
          setUser(user);
          setIsLoggedIn(true);
        } else {
          setUser(null);
          setIsLoggedIn(false);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  return (
    <globalContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, isLoading, user }}
    >
      {children}
    </globalContext.Provider>
  );
};

export default GlobalProvider;
