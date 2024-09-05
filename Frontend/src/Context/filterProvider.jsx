import { createContext, useState } from "react";

const FilterContext = createContext();

const FilterProvider = ({ children }) => {
  const today = new Date();
  const todayString = today.toISOString().split("T")[0];
  const authData = JSON.parse(sessionStorage.getItem("auth"));
  const coshopno = authData.coshopno;
  const [selectedFilter, setSelectedFilter] = useState({
    date: todayString,
    shop: coshopno||"",
  });

  return (
    <FilterContext.Provider
      value={{
        selectedFilter,
        setSelectedFilter,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export { FilterProvider, FilterContext };
