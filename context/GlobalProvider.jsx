import React, { useContext, createContext, useState, useEffect } from "react";
import { getCurrentUser } from "../lib/appwrite";
import { usePathname } from "expo-router";
import { Alert } from "react-native";

const globalContext = createContext();
export const useGlobalContext = () => useContext(globalContext);

const GlobalProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const path = usePathname();
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
      .catch((err) => Alert.alert(err.message))
      .finally(() => {
        setIsLoading(false);
      });
  }, [path]);
  return (
    <globalContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, isLoading, user, setUser }}
    >
      {children}
    </globalContext.Provider>
  );
};

export default GlobalProvider;
