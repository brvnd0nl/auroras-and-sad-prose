import { createContext, useContext, useState } from "react";

export const AppContext = createContext();

export const useAppContext = () => {
    const context = useContext(AppContext);
  
    if (!context)
      throw new Error(
        "useAppContext must be used within a AppContextProvider"
      );
  
    return context;
  };

export const AppContextProvider = ({ children }) => {
    return (
        <AppContext.Provider
          value={{
          }}
        >
          {children}
        </AppContext.Provider>
      );
};