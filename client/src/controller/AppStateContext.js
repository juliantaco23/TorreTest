import React, { createContext, useState, useEffect, useContext } from "react";

const AppStateContext = createContext();

export const useAppState = () => {
  return useContext(AppStateContext);
};

export const AppStateProvider = ({ children }) => {
  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    const storedRecentSearches = localStorage.getItem("recentSearches");
    if (storedRecentSearches) {
      setRecentSearches(JSON.parse(storedRecentSearches));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
  }, [recentSearches]);


  return (
    <AppStateContext.Provider value={{ recentSearches, setRecentSearches }}>
      {children}
    </AppStateContext.Provider>
  );
};
