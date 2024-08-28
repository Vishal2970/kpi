// import React from "react";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import IconButton from "@mui/material/IconButton";
// import FilterListIcon from "@mui/icons-material/FilterList";
// import Box from "@mui/material/Box";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";

// export default function BasicTable({ rows, widgetName }) {
//   console.log(widgetName);

//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const [filter, setFilter] = React.useState(null);

//   // Log rows for debugging
//   console.log("rows", rows);

//   // Validate rows: it should be an array of objects
//   if (
//     !Array.isArray(rows) ||
//     rows.some((row) => typeof row !== "object" || row === null)
//   ) {
//     console.error("Invalid prop type for rows");
//     return null;
//   }

//   // Determine column names based on the first row
//   const columnNames = rows.length > 0 ? Object.keys(rows[0]) : [];

//   const handleFilterClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleFilterClose = () => {
//     setAnchorEl(null);
//   };

//   const handleFilterSelect = (filter) => {
//     setFilter(filter);
//     setAnchorEl(null);
//     // Implement filter logic here if needed
//   };

//   return (
//     <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
//       <TableContainer component={Paper}>
//         <Box sx={{ position: "relative" }}>
//           <IconButton
//             sx={{
//               position: "absolute",
//               insetBlockStart: 8,
//               insetInlineEnd: 8,
//             }}
//             size="small"
//             onClick={handleFilterClick}
//           >
//             <FilterListIcon />
//           </IconButton>
//           <Menu
//             anchorEl={anchorEl}
//             open={Boolean(anchorEl)}
//             onClose={handleFilterClose}
//           >
//             <MenuItem onClick={() => handleFilterSelect("option1")}>
//               Option 1
//             </MenuItem>
//             <MenuItem onClick={() => handleFilterSelect("option2")}>
//               Option 2
//             </MenuItem>
//             <MenuItem onClick={() => handleFilterSelect("option3")}>
//               Option 3
//             </MenuItem>
//           </Menu>
//           <Table sx={{ inlineSize: 650 }} size="small" aria-label="a dense table">
//             <TableHead>
//               <TableRow>
//                 <TableCell colSpan={columnNames} align="center" sx={{ padding: "4px 16px" }}>
//                   {widgetName}
//                 </TableCell>
//               </TableRow>
//               <TableRow>
//                 {columnNames.map((columnName, index) => (
//                   <TableCell key={index} align="left" sx={{ padding: "4px 16px" }}>
//                     {columnName}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {rows.map((row, rowIndex) => (
//                 <TableRow
//                   sx={{
//                     "&:last-child td, &:last-child th": { border: 0 },
//                   }}
//                   key={rowIndex}
//                 >
//                   {columnNames.map((columnName, cellIndex) => (
//                     <TableCell key={cellIndex} align="left" sx={{ padding: "4px 16px" }}>
//                       {row[columnName]}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </Box>
//       </TableContainer>
//     </Box>
//   );
// }

import React from "react";
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

// Memoized FilterButton Component
const FilterButton = React.memo(({ onClick }) => {
  return (
    <IconButton
      sx={{
        position: "absolute",
        top: 8,
        right: 8,
      }}
      size="small"
      onClick={onClick}
    >
      <FilterListIcon />
    </IconButton>
  );
});

export default function BasicTable({ rows, widgetName }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [filter, setFilter] = React.useState(null);

  const filteredRows = React.useMemo(() => {
    if (!filter) return rows;
    // Example filtering logic
    return rows.filter((row) => row.CopkChildName === filter);
  }, [filter, rows]);

  // Validate rows: it should be an array of objects
  if (
    !Array.isArray(rows) ||
    rows.some((row) => typeof row !== "object" || row === null)
  ) {
    console.error("Invalid prop type for rows");
    return null;
  }

  // Determine column names based on the first row
  const columnNames = rows.length > 0 ? Object.keys(rows[0]) : [];

  const handleFilterClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setAnchorEl(null);
  };

  const handleFilterSelect = (selectedFilter) => {
    setFilter(selectedFilter);
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <TableContainer component={Paper}>
        <Box sx={{ position: "relative" }}>
          <Table
            sx={{ inlineSize: 650 }}
            size="small"
            aria-label="a dense table"
            key={filteredRows.length}
          >
            <TableHead>
              <TableRow>
                <TableCell
                  colSpan={columnNames}
                  align="center"
                  sx={{ padding: "4px 16px" }}
                >
                  {widgetName}
                </TableCell>
              </TableRow>
              <TableRow>
                {columnNames.map((columnName, index) => (
                  <TableCell
                    key={index}
                    align="left"
                    sx={{ padding: "4px 16px" }}
                  >
                    {columnName}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows.map((row, rowIndex) => (
                <TableRow
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                  key={rowIndex}
                >
                  {columnNames.map((columnName, cellIndex) => (
                    <TableCell
                      key={cellIndex}
                      align="left"
                      sx={{ padding: "4px 16px" }}
                    >
                      {row[columnName]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Box sx={{ position: "stickey", top: 0, right: 0, zIndex: 1 }}>
            <FilterButton onClick={handleFilterClick} />
          </Box>
        </Box>
      </TableContainer>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleFilterClose}
      >
        <MenuItem onClick={() => handleFilterSelect("Option1")}>
          Option 1
        </MenuItem>
        <MenuItem onClick={() => handleFilterSelect("Option2")}>
          Option 2
        </MenuItem>
        <MenuItem onClick={() => handleFilterSelect("Option3")}>
          Option 3
        </MenuItem>
      </Menu>
    </Box>
  );
}
