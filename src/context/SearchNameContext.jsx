import { createContext, useContext, useState } from "react";
import { Outlet } from "react-router-dom";

// Descriptive context name for better readability
const SearchNameContext = createContext();

export const useSearchName = () => {
  return useContext(SearchNameContext);
};

export const SearchNameProvider = ({ children }) => {
  const [searchName, setSearchName] = useState("");

  // Context object providing access to state and update functions
  const contextValue = {
    searchName,
    setSearchName,
  };

  return (
    <SearchNameContext.Provider value={contextValue}>
      <Outlet />
    </SearchNameContext.Provider>
  );
};
