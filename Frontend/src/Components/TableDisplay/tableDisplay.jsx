// import React from "react";
// import BasicTable from "../tables/test"; // Ensure this path is correct
// import { Grid, Container } from "@mui/material";

// export default function TableDisplay() {
//   const columns = [
//     { id: "name", label: "Dessert (100g serving)" },
//     { id: "calories", label: "Calories", align: "right" },
//     { id: "fat", label: "Fat (g)", align: "right" },
//     { id: "carbs", label: "Carbs (g)", align: "right" },
//     { id: "protein", label: "Protein (g)", align: "right" },
//   ];

//   const rows = [
//     { name: "Frozen yoghurt", calories: 159, fat: 6.0, carbs: 24, protein: 4.0 },
//     { name: "Ice cream sandwich", calories: 237, fat: 9.0, carbs: 37, protein: 4.3 },
//     { name: "Eclair", calories: 262, fat: 16.0, carbs: 24, protein: 6.0 },
//     { name: "Cupcake", calories: 305, fat: 3.7, carbs: 67, protein: 4.3 },
//     { name: "Gingerbread", calories: 356, fat: 16.0, carbs: 49, protein: 3.9 },
//   ];

//   return (
//     <Container>
//       <Grid container spacing={2} justifyContent="center">
//         {Array(6).fill().map((_, index) => (
//           <Grid item xs={12} sm={6} md={4} key={index}>
//             <BasicTable columns={columns} rows={rows} />
//           </Grid>
//         ))}
//       </Grid>
//     </Container>
//   );
// }

// // import React from "react";
// // import BasicTable from "../tables/test"; // Ensure this path is correct
// // import { Grid, Container } from "@mui/material";

// // export default function TableDisplay({tableNumber}) {
// //   const columns = [
// //     { id: 'name', label: 'Dessert (100g serving)', type: 'string' },
// //     { id: 'calories', label: 'Calories', align: 'right', type: 'number' },
// //     { id: 'fat', label: 'Fat (g)', align: 'right', type: 'number' },
// //     { id: 'carbs', label: 'Carbs (g)', align: 'right', type: 'number' },
// //     { id: 'protein', label: 'Protein (g)', align: 'right', type: 'number' },
// //     { id: 'category', label: 'Category', align: 'left', type: 'string' },  // New column
// //     { id: 'rating', label: 'Rating', align: 'center', type: 'number' }  // New column
// //   ];

// //   const rows = [
// //     { id: 1, name: 'Frozen yoghurt', calories: 159, fat: 6.0, carbs: 24, protein: 4.0, category: 'Dessert', rating: 4.5 },
// //     { id: 2, name: 'Ice cream sandwich', calories: 237, fat: 9.0, carbs: 37, protein: 4.3, category: 'Dessert', rating: 4.7 },
// //     { id: 3, name: 'Eclair', calories: 262, fat: 16.0, carbs: 24, protein: 6.0, category: 'Pastry', rating: 4.8 },
// //     { id: 4, name: 'Cupcake', calories: 305, fat: 3.7, carbs: 67, protein: 4.3, category: 'Dessert', rating: 4.6 },
// //     { id: 5, name: 'Gingerbread', calories: 356, fat: 16.0, carbs: 49, protein: 3.9, category: 'Pastry', rating: 4.9 },
// //     { id: 6, name: 'Brownie', calories: 400, fat: 20.0, carbs: 60, protein: 5.0, category: 'Dessert', rating: 4.4 },
// //     { id: 7, name: 'Macaron', calories: 150, fat: 7.0, carbs: 20, protein: 3.5, category: 'Dessert', rating: 4.6 },
// //     { id: 8, name: 'Cheesecake', calories: 400, fat: 30.0, carbs: 30, protein: 7.0, category: 'Dessert', rating: 4.8 },
// //     { id: 9, name: 'Frozen yoghurt', calories: 159, fat: 6.0, carbs: 24, protein: 4.0, category: 'Dessert', rating: 4.5 },
// //     { id: 10, name: 'Ice cream sandwich', calories: 237, fat: 9.0, carbs: 37, protein: 4.3, category: 'Dessert', rating: 4.7 },
// //     { id: 11, name: 'Eclair', calories: 262, fat: 16.0, carbs: 24, protein: 6.0, category: 'Pastry', rating: 4.8 },
// //     { id: 12, name: 'Cupcake', calories: 305, fat: 3.7, carbs: 67, protein: 4.3, category: 'Dessert', rating: 4.6 },
// //     { id: 13, name: 'Gingerbread', calories: 356, fat: 16.0, carbs: 49, protein: 3.9, category: 'Pastry', rating: 4.9 },
// //     { id: 14, name: 'Brownie', calories: 400, fat: 20.0, carbs: 60, protein: 5.0, category: 'Dessert', rating: 4.4 },
// //     { id: 15, name: 'Macaron', calories: 150, fat: 7.0, carbs: 20, protein: 3.5, category: 'Dessert', rating: 4.6 },
// //     { id: 16, name: 'Cheesecake', calories: 400, fat: 30.0, carbs: 30, protein: 7.0, category: 'Dessert', rating: 4.8 },
// //     { id: 17, name: 'Frozen yoghurt', calories: 159, fat: 6.0, carbs: 24, protein: 4.0, category: 'Dessert', rating: 4.5 },
// //     { id: 18, name: 'Ice cream sandwich', calories: 237, fat: 9.0, carbs: 37, protein: 4.3, category: 'Dessert', rating: 4.7 },
// //     { id: 19, name: 'Eclair', calories: 262, fat: 16.0, carbs: 24, protein: 6.0, category: 'Pastry', rating: 4.8 },
// //     { id: 20, name: 'Cupcake', calories: 305, fat: 3.7, carbs: 67, protein: 4.3, category: 'Dessert', rating: 4.6 },
// //     { id: 21, name: 'Gingerbread', calories: 356, fat: 16.0, carbs: 49, protein: 3.9, category: 'Pastry', rating: 4.9 },
// //     { id: 22, name: 'Brownie', calories: 400, fat: 20.0, carbs: 60, protein: 5.0, category: 'Dessert', rating: 4.4 },
// //     { id: 23, name: 'Macaron', calories: 150, fat: 7.0, carbs: 20, protein: 3.5, category: 'Dessert', rating: 4.6 },
// //     { id: 24, name: 'Cheesecake', calories: 400, fat: 30.0, carbs: 30, protein: 7.0, category: 'Dessert', rating: 4.8 },
// //     { id: 25, name: 'Frozen yoghurt', calories: 159, fat: 6.0, carbs: 24, protein: 4.0, category: 'Dessert', rating: 4.5 },
// //     { id: 26, name: 'Ice cream sandwich', calories: 237, fat: 9.0, carbs: 37, protein: 4.3, category: 'Dessert', rating: 4.7 },
// //     { id: 27, name: 'Eclair', calories: 262, fat: 16.0, carbs: 24, protein: 6.0, category: 'Pastry', rating: 4.8 },
// //     { id: 28, name: 'Cupcake', calories: 305, fat: 3.7, carbs: 67, protein: 4.3, category: 'Dessert', rating: 4.6 },
// //     { id: 29, name: 'Gingerbread', calories: 356, fat: 16.0, carbs: 49, protein: 3.9, category: 'Pastry', rating: 4.9 },
// //     { id: 30, name: 'Brownie', calories: 400, fat: 20.0, carbs: 60, protein: 5.0, category: 'Dessert', rating: 4.4 },
// //     { id: 31, name: 'Macaron', calories: 150, fat: 7.0, carbs: 20, protein: 3.5, category: 'Dessert', rating: 4.6 },
// //     { id: 32, name: 'Cheesecake', calories: 400, fat: 30.0, carbs: 30, protein: 7.0, category: 'Dessert', rating: 4.8 },
// //   ];

// //   return (
// //     <Container>
// //       <Grid container spacing={2} justifyContent="center">
// //         {Array(tableNumber).fill().map((_, index) => (
// //           <Grid item xs={12} sm={6} md={4} key={index}>
// //             <BasicTable columns={columns} rows={rows} />
// //           </Grid>
// //         ))}
// //       </Grid>
// //     </Container>
// //   );
// // }

import React from "react";
import BasicTable from "../tables/test";
import { Grid, Container } from "@mui/material";

export default function TableDisplay({ numberOfBoxes }) {
  const columns = [
    { id: "name", label: "Dessert (100g serving)" },
    { id: "calories", label: "Calories", align: "right" },
    { id: "fat", label: "Fat (g)", align: "right" },
    { id: "carbs", label: "Carbs (g)", align: "right" },
    { id: "protein", label: "Protein (g)", align: "right" },
  ];

  const rows = [
    {
      name: "Frozen yoghurt",
      calories: 159,
      fat: 6.0,
      carbs: 24,
      protein: 4.0,
    },
    {
      name: "Ice cream sandwich",
      calories: 237,
      fat: 9.0,
      carbs: 37,
      protein: 4.3,
    },
    { name: "Eclair", calories: 262, fat: 16.0, carbs: 24, protein: 6.0 },
    { name: "Cupcake", calories: 305, fat: 3.7, carbs: 67, protein: 4.3 },
    { name: "Gingerbread", calories: 356, fat: 16.0, carbs: 49, protein: 3.9 },
  ];

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
