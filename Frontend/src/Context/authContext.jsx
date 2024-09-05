import { useState, useEffect, useContext, createContext } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: null,
    coshopno:[],
  });
  useEffect(() => {
    const data = sessionStorage.getItem("auth");
    // console.log("Context "+data);
    if (data) {
      const parsedData = JSON.parse(data);
      setAuth({
        token: parsedData.token,
        coshopno:parsedData.coshopno,
      });
    }
  }, []);
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
const useAuthContext = () => useContext(AuthContext);

export { useAuthContext, AuthProvider };