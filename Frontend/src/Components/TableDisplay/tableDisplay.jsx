// import React, { useEffect, useState } from "react";
// import BasicTable from "../tables/test";
// import { Grid, Container } from "@mui/material";

// export default function TableDisplay({ numberOfBoxes }) {
//   const [column,setColumn]=useState([]);
//   const [row, setRow] = useState([]);

//   useEffect(()=>{
//     const data=async()=>{
//       await axios("http://localhost:5000/api/check-table");
//     }
//   },[])

//   const columns = [
//     { id: "name", label: "Dessert (100g serving)" },
//     { id: "calories", label: "Calories", align: "right" },
//     { id: "fat", label: "Fat (g)", align: "right" },
//     { id: "carbs", label: "Carbs (g)", align: "right" },
//     { id: "protein", label: "Protein (g)", align: "right" },
//   ];

//   const rows = [
//     {
//       name: "Frozen yoghurt",
//       calories: 159,
//       fat: 6.0,
//       carbs: 24,
//       protein: 4.0,
//     },
//     {
//       name: "Ice cream sandwich",
//       calories: 237,
//       fat: 9.0,
//       carbs: 37,
//       protein: 4.3,
//     },
//     { name: "Eclair", calories: 262, fat: 16.0, carbs: 24, protein: 6.0 },
//     { name: "Cupcake", calories: 305, fat: 3.7, carbs: 67, protein: 4.3 },
//     { name: "Gingerbread", calories: 356, fat: 16.0, carbs: 49, protein: 3.9 },
//   ];

//   return (
//     <Container>
//       <Grid container spacing={2} justifyContent="center">
//         {Array(numberOfBoxes)
//           .fill()
//           .map((_, index) => (
//             <Grid item xs={12} sm={6} md={4} key={index}>
//               <BasicTable columns={columns} rows={rows} />
//             </Grid>
//           ))}
//       </Grid>
//     </Container>
//   );
// }

import React, { useEffect, useState } from "react";
import BasicTable from "../tables/test";
import { Grid, Container } from "@mui/material";
import axios from "axios";  // Make sure axios is imported

export default function TableDisplay({ numberOfBoxes }) {
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/check-table");
        const data = response.data;

        // Accessing the recordset array from the response data
        if (data && data.data && data.data.recordset && data.data.recordset.length > 0) {
          // Extract columns from the keys of the first object in recordset
          const columns = Object.keys(data.data.recordset[0]).map((key) => ({
            id: key,
            label: key,
          }));
          setColumns(columns);

          // Extract rows by mapping through the recordset array
          const rows = data.data.recordset.map((item) => ({
            ...item
          }));
          setRows(rows);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container>
      <Grid container spacing={2} justifyContent="center">
        {Array(numberOfBoxes)
          .fill()
          .map((_, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <BasicTable columns={columns} rows={rows} />
            </Grid>
          ))}
      </Grid>
    </Container>
  );
}

