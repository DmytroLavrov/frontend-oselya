import { createContext, useState, useContext } from 'react';

const UIContext = createContext();

export const useUIContext = () => useContext(UIContext);

export const UIProvider = ({ children }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [isBurgerClass, setIsBurgerClass] = useState(false);
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const toggleBurgerClass = () => {
    setIsBurgerClass((prevState) => !prevState);
  };
  const closeMenu = () => {
    setIsBurgerClass(false);
  };

  return (
    <UIContext.Provider
      value={{
        showLogin,
        setShowLogin,
        isBurgerClass,
        toggleBurgerClass,
        closeMenu,
        search,
        setSearch,
        showSearch,
        setShowSearch,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
