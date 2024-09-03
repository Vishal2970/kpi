import { useEffect, useState } from "react";
import { useAuthContext } from "../../Context/authContext";
import { Outlet } from "react-router-dom";
import axios from "axios";

const PrivateRoute = () => {
  const URI = "http://localhost:5000/api/userAuth";
  const [ok, setOk] = useState(false);
  const { auth } = useAuthContext();
  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get(URI, {
        headers: {
          Authorization: auth?.token,
        },
      });
      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth?.token) {
      authCheck();
    }
  }, [auth?.token]);

  return ok ? <Outlet /> :<><h1>NOT AUTHORIZED....</h1></>;
};

export default PrivateRoute;