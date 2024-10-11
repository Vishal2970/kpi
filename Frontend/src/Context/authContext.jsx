import { useState, useEffect, useContext, createContext } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: null,
    coshopno: [],
    userId: null,
    macAddress: null,
  });

  useEffect(() => {
    const data = sessionStorage.getItem("auth");
    if (data) {
      const parsedData = JSON.parse(data);
      setAuth({
        token: parsedData.token,
        coshopno: parsedData.coshopno,
        userId: parsedData.userId,
        macAddress: parsedData.macAddress,
      });
    } else {
      // Initialize auth context with default values
      setAuth({
        token: "",
        coshopno: [],
        userId: null,
        macAddress: null,
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