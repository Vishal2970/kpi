import React from "react";
import TableDisplay from "./Components/TableDisplay/tableDisplay";
import NavBar from "./Components/Navbar";


function App() {
  
  return (
    <>
      <NavBar />
      <TableDisplay numberOfBoxes={9} />
    </>
  );
}

export default App;
