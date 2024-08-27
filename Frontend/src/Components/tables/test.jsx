// import React from 'react';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';

// export default function BasicTable({ columns, rows }) {
//   if (!Array.isArray(columns) || !Array.isArray(rows)) {
//     console.error('Invalid prop types for columns or rows');
//     return null;
//   }

//   return (
//     <TableContainer component={Paper}>
//       <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
//         <TableHead>
//           <TableRow>
//             {columns.map((column) => (
//               <TableCell
//                 key={column.id}
//                 align={column.align || 'left'}
//                 sx={{ padding: '4px 16px' }}
//               >
//                 {column.label}
//               </TableCell>
//             ))}
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {rows.map((row, rowIndex) => (
//             <TableRow
//               key={rowIndex}
//               sx={{ '&:last-child td, &:last-child th': { border: 0 }, marginBottom: '-4px' }}
//             >
//               {columns.map((column) => (
//                 <TableCell
//                   key={column.id}
//                   align={column.align || 'left'}
//                   sx={{ padding: '4px 16px' }}
//                 >
//                   {row[column.id]}
//                 </TableCell>
//               ))}
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// }

// // import * as React from 'react';
// // import { DataGrid, GridToolbar } from '@mui/x-data-grid';

// // export default function BasicTable({ columns, rows }) {
// //   const formattedColumns = columns.map(column => ({
// //     field: column.id,
// //     headerName: column.label,
// //     align: column.align || 'left',
// //     hideable: column.hideable || false,
// //     type: column.type || 'string',
// //     filterable: column.filterable !== false,
// //   }));

// //   return (
// //     <div style={{ height: 400, width: '100%' }}>
// //       <DataGrid
// //         columns={formattedColumns}
// //         rows={rows}
// //         components={{
// //           Toolbar: GridToolbar,
// //         }}
// //         filterModel={{
// //           items: [{ columnField: 'name', operatorValue: 'contains', value: '' }],
// //         }}
// //       />
// //     </div>
// //   );
// // }

import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FilterListIcon from "@mui/icons-material/FilterList";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

export default function BasicTable({ columns, rows }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [filter, setFilter] = useState(null);

  if (!Array.isArray(columns) || !Array.isArray(rows)) {
    console.error("Invalid prop types for columns or rows");
    return null;
  }

  const handleFilterClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setAnchorEl(null);
  };

  const handleFilterSelect = (filter) => {
    setFilter(filter);
    setAnchorEl(null);
    console.log(filter);
  };

  return (
    <TableContainer component={Paper}>
      <Box sx={{ position: "relative" }}>
        <IconButton
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
          }}
          size="small"
          onClick={handleFilterClick}
        >
          <FilterListIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleFilterClose}
        >
          <MenuItem onClick={() => handleFilterSelect("option1")}>
{/* high hai to low aur low hai to high
table hai to graph aur graph hai to table */}

            Option 1
          </MenuItem>
          <MenuItem onClick={() => handleFilterSelect("option2")}>
            Option 2
          </MenuItem>
          <MenuItem onClick={() => handleFilterSelect("option3")}>
            Option 3
          </MenuItem>
        </Menu>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align || "left"}
                  sx={{ padding: "4px 16px" }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  marginBottom: "-4px",
                }}
              >
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align || "left"}
                    sx={{ padding: "4px 16px" }}
                  >
                    {row[column.id]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </TableContainer>
  );
}
