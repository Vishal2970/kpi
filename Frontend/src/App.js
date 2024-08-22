import React from "react";
import TableDisplay from "./Components/TableDisplay/tableDisplay";
import NavBar from "./Components/Navbar";
import CardDisplay from "./Components/Cards/CardDisplay";
import { Box } from "@mui/material";

function App() {
  return (
    <>
      <NavBar  />
      <Box mt={3}  mb={3}>
        <CardDisplay />
      </Box>
      {/* <Box mt={3} mb={3}> {/ Margin at the top and bottom /} */}
        <TableDisplay />
      {/* </Box> */}
    </>
  );
}

export default App;
