
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

// Memoized FilterButton Component
const FilterButton = React.memo(({ onClick }) => {
  return (
    <IconButton
      sx={{
        position: "absolute",
        insetBlockStart: 8,
        insetInlineEnd: 8,
      }}
      size="small"
      onClick={onClick}
    >
      <FilterListIcon />
    </IconButton>
  );
});

export default function BasicTable({ rows, widgetName, filterProps,filterGraph }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [orderDisplay, setOrderDisplay] = useState(false);

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
    selectedFilter === "DESC" ? setOrderDisplay(true) : setOrderDisplay(false);
    filterProps([widgetName, selectedFilter]);
    setAnchorEl(null);
  };
  const handleGraph = (selectedFilter) => {
    filterGraph([widgetName, selectedFilter]);
    setAnchorEl(null);
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        position: "relative",
        inlineSize: "350px", // You can adjust the width here
        blockSize: "320px", // You can adjust the height here
        overflow: "auto", // Controls overflow, enabling scroll if content exceeds box size
        padding: "16px",
        border: "1px solid #ddd",
        borderRadius: "8px",
      }}
    >
      <TableContainer component={Paper}>
        <Table
          sx={{ minInlineSize: "100%" }} // Ensures the table fits within the container width
          size="small"
          aria-label="a dense table"
          key={rows.length}
        >
          <TableBody>
            <TableRow>
              <TableCell
                colSpan={columnNames.length}
                align="center"
                sx={{ padding: "4px 0px" }}
              >
                {widgetName}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <FilterButton onClick={handleFilterClick} />
      <TableContainer component={Paper}>
        <Table
          sx={{ minInlineSize: "600%" }} // Ensures the table fits within the container width
          size="small"
          aria-label="a dense table"
          key={rows.length}
        >
          <TableHead>
            <TableRow>
              {columnNames.map((columnName, index) => (
                <TableCell key={index} align="left" sx={{ padding: "4px 16px" }}>
                  {columnName}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columnNames.length} align="center">
                  No Data Found
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row, rowIndex) => (
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
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleFilterClose}>
        {orderDisplay ? (
          <MenuItem onClick={() => handleFilterSelect("ASC")}>ASC</MenuItem>
        ) : (
          <MenuItem onClick={() => handleFilterSelect("DESC")}>DSC</MenuItem>
        )}
        <MenuItem onClick={() => handleGraph("GRAPH")}>GRAPH</MenuItem>
      </Menu>
    </Box>
  );
}