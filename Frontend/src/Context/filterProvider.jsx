import { createContext, useState } from "react";

const FilterContext = createContext();

const FilterProvider = ({ children }) => {
  const today = new Date();
  const todayString = today.toISOString().split("T")[0];
  const authData = JSON.parse(sessionStorage.getItem("auth"));
  const coshopno = authData?.coshopno?authData.coshopno:"3032";
  const [selectedFilter, setSelectedFilter] = useState({
    date: todayString,
    shop: coshopno||"3032",
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
