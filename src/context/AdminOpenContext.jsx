import { createContext, useContext, useState } from "react";

const OpenStateContext = createContext();

// Create a provider component
export const OpenStateProvider = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <OpenStateContext.Provider value={{ open, setOpen }}>
      {children}
    </OpenStateContext.Provider>
  );
};

export const useOpenState = () => {
  const context = useContext(OpenStateContext);
  if (!context) {
    throw new Error("useOpenState must be used within an OpenStateProvider");
  }
  return context;
};
