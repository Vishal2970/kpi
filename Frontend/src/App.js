import React from "react";
import TableDisplay from "./Components/TableDisplay/tableDisplay";
import NavBar from "./Components/Navbar";
import CardDisplay from "./Components/Cards/CardDisplay";
import { Box } from "@mui/material";
// import Bargraph from "./Components/Graph/Bargraph";

function App() {
  return (
    <>
      <NavBar />
      <Box mt={3} mb={4}>
        <CardDisplay />
      </Box>
      <TableDisplay />
      {/* <Bargraph/> */}
    </>
  );
}

export default App;
