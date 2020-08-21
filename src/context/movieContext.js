import React, { createContext, useState } from "react";

const defaultState = {
  someting: "hi there.",
};

export const MovieContext = createContext(defaultState);

export const MovieProvider = ({ children }) => {
  const [isLoading, setLoading] = useState(false);
  const [burgerMenu, setBurgerMenu] = useState(false);

  return (
    <MovieContext.Provider
      value={{
        ...defaultState,
        isLoading,
        setLoading,
        burgerMenu,
        setBurgerMenu,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};
