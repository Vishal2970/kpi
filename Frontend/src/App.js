import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Components/Login/Login";
import Navbar from "./Components/NavBar/Navbar"
import CardDisplay from "./Components/Cards/CardDisplay";
import TableDisplay from "./Components/tables/tableDisplay";
import PrivateRoute from "./Components/PrivateRoutes/PrivateRoute";

// import Bargraph from "./Components/Graph/Bargraph";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Home" element={<PrivateRoute />}>
            <Route path="" element={<><CardDisplay /><TableDisplay /></>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;