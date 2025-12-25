// DrawerContext.js
import { createContext, useContext, useState } from 'react';

const DrawerContext = createContext();

export const DrawerProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = (open) => {
    setIsOpen(open);
  };

  return (
    <DrawerContext.Provider value={{ isOpen, toggleDrawer }}>
      {children}
    </DrawerContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useDrawer = () => useContext(DrawerContext);