import React, { useContext, useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import axios from "axios";
import logo from "../../Images/login.jpg";
import { useAuthContext } from "../../Context/authContext";
import { FilterContext } from "../../Context/filterProvider";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { setAuth } = useAuthContext();
  const { setSelectedFilter } = useContext(FilterContext);
  const [login, setLogin] = useState({
    CopkUserId: "",
    copassword: "",
  });
  const Navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/Auth",
        login
      );
      const data = response.data;
      // console.log(data);

      sessionStorage.setItem(
        "auth",
        JSON.stringify({
          coshopno: data.coshopno,
          token: data.token,
          userId: data.CopkUserId,
          macAddress: data.macAddress,
        })
      );
      setAuth({
        coshopno: data.coshopno,
        token: data.token,
        userId: data?.CopkUserId || 1,
        macAddress: data.macAddress,
      });
      // console.log("auth", auth);

      const today = new Date();
      const todayString = today.toISOString().split("T")[0];
      setSelectedFilter({
        date: todayString,
        shop: data.coshopno,
      });
      // setSelectedFilter((prevFilter) => ({
      //   ...prevFilter,
      //   shop: data.coshopno,
      // }));
      Navigate("/Home");
      //alert(response.data.message);
    } catch (error) {
      alert("Database is Not Started");
      console.log(error.response.data.message);
    }
  };
  const handleChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        blockSize: "100vh",
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          "& > :not(style)": { m: 1, inlineSize: "25ch" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 2,
          border: 1,
          borderColor: "grey.200",
          borderRadius: 2,
        }}
        noValidate
        autoComplete="off"
      >
        <img
          src={logo}
          alt="login"
          style={{
            inlineSize: 150,
            blockSize: 140,
            // borderRadius: "50%",
            objectFit: "cover",
            position: "relative",
            insetBlockStart: -15,
          }}
        />
        <TextField
          id="outlined-basic-username"
          label="User Name"
          name="CopkUserId"
          value={login.CopkUserId}
          onChange={handleChange}
          variant="outlined"
        />
        <TextField
          id="outlined-basic-password"
          label="Password"
          name="copassword"
          value={login.copassword}
          onChange={handleChange}
          type="password"
          variant="outlined"
        />
        <Button variant="outlined" type="submit">
          Login
        </Button>
      </Box>
    </div>
  );
}
