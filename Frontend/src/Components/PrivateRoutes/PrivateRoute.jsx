import { useEffect, useState } from "react";
import { useAuthContext } from "../../Context/authContext";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";

const PrivateRoute = () => {
  const URI = "http://localhost:5000/api/userAuth";
  const macURI = "http://localhost:5000/api/macAddressVerification";
  const [ok, setOk] = useState(false);
  const [okRedirect, setOkRedirect] = useState(true);
  const { auth,setAuth } = useAuthContext();
  const navigate = useNavigate();
  const [secondsCount, setSecondsCount] = useState(0);

  const verifyMac = async () => {
    let macAddress;

    if (auth?.userId) {
      try {
        const macRes = await axios.get(`${macURI}?userId=${auth?.userId}`, {
          headers: {
            Authorization: auth?.token,
          },
        });
        macAddress = macRes.data.macAddress;
      } catch (error) {
        console.error("Error fetching MAC address:", error);
        macAddress = null;
      }
    } else {
      macAddress = null;
    }

    return macAddress;
  };

  useEffect(() => {
    const authCheck = async () => {
      if (!auth?.token) {
        // Handle null token situation
        console.log("Token is null. Redirecting to login page...");
        // Redirect to login page or handle accordingly
        return;
      }

      try {
        const res = await axios.get(URI, {
          headers: {
            Authorization: auth?.token,
          },
        });

        const macAddress = await verifyMac();
        const isSameMac = macAddress === auth?.macAddress;
        if (res.data.ok && isSameMac) {
          setOk(true);
        } else {
          setOk(false);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (auth?.token) {
      authCheck();
    }
  }, [auth?.token, verifyMac]);

  useEffect(() => {
    let intervalId;
    if (!ok) {
      intervalId = setInterval(() => {
        setSecondsCount((prevSeconds) => {
          const newSeconds = prevSeconds + 1;
          if (newSeconds >= 3) {
            clearInterval(intervalId);
            setOkRedirect(false);
          }
          return newSeconds;
        });
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [ok]);

  useEffect(() => {
    if (!okRedirect) {
      navigate("/");
      sessionStorage.clear();
      setAuth({
        token: null,
        coshopno: [],
        userId: null,
        macAddress: null,
      });
    }
  }, [okRedirect, navigate]);

  return ok ? (
    <Outlet />
  ) : (
    <>
      <h1>NOT AUTHORIZED.... {secondsCount} seconds.</h1>
    </>
  );
};

export default PrivateRoute;
