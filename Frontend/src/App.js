import React from "react";
import NavBar from "./Components/Navbar";
import CardDisplay from "./Components/Cards/CardDisplay";
import { Box } from "@mui/material";
import TableDisplay from "./Components/tables/tableDisplay";
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
