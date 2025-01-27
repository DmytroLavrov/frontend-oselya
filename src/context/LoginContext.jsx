import { createContext, useState, useContext } from 'react';

const LoginContext = createContext();

export const useLoginContext = () => useContext(LoginContext);

export const LoginProvider = ({ children }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [isBurgerClass, setIsBurgerClass] = useState(false);

  const toggleBurgerClass = () => {
    setIsBurgerClass((prevState) => !prevState);
  };
  const closeMenu = () => {
    setIsBurgerClass(false);
  };

  return (
    <LoginContext.Provider
      value={{
        showLogin,
        setShowLogin,
        isBurgerClass,
        toggleBurgerClass,
        closeMenu,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};
