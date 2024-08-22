import React from "react";
import TableDisplay from "./Components/TableDisplay/tableDisplay";
import NavBar from "./Components/Navbar";
import Card from "./Components/Cards/Card";
import { Container, Grid, Typography, Box } from "@mui/material";

function App() {
  const totalCards = 5; // Adjust according to the total number of cards you have

  // Create an array of card labels or data for demonstration
  const cardLabels = Array.from({ length: totalCards }, (_, index) => `Card ${index + 1}`);

  return (
    <>
      <NavBar />
      <Container>
        <Grid container spacing={3} direction="column" alignItems="center">
          <Grid item xs={12} style={{ width: '100%' }}>
            <Typography variant="h6">Cards</Typography>
            <Box
              sx={{
                display: 'flex',
                overflowX: 'auto', // Enable horizontal scrolling
                width: '100%',
                padding: '10px',
                flexWrap: 'nowrap', // Prevent wrapping of cards
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  gap: '16px', // Adjust the spacing between cards
                }}
              >
                {cardLabels.map((label, index) => (
                  <Card key={index} label={label} />
                ))}
              </Box>
            </Box>
          </Grid>
          <Grid item>
            <TableDisplay
              numberOfBoxes={6} // Adjust according to the number of URLs
              URLS={[
                "http://localhost:5000/api/check-table",
                "http://localhost:5000/api/check-table1",
                "http://localhost:5000/api/check-table2",
                "http://localhost:5000/api/check-table",
                "http://localhost:5000/api/check-table1",
                "http://localhost:5000/api/check-table2",
              ]}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default App;
