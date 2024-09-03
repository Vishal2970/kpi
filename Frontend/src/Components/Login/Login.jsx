import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import axios from "axios";

export default function Login() {
  const [login, setLogin] = useState({
    CopkUserId: "",
    copassword: "",
  });
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/Auth",
        login
      );
      alert(response.data.message);
    } catch (error) {
      console.log(error.response.data);
      alert(error.response.data.message);
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
        height: "100vh",
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
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
        <TextField
          id="outlined-basic"
          label="User Name"
          name="CopkUserId"
          value={login.CopkUserId}
          onChange={handleChange}
          variant="outlined"
        />
        <TextField
          id="outlined-basic"
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
