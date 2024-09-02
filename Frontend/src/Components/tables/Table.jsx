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

export default function BasicTable({ rows, widgetName, filterProps }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  // const [tableDisplay, setTableDisplay] = useState(false);
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
    // selectedFilter === "GRAPH" ? setTableDisplay(true) : setTableDisplay(false);

    filterProps([widgetName, selectedFilter]);
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
            key={rows.length}
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
              {rows.map((row, rowIndex) => (
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
          <Box sx={{ position: "stickey", insetBlockStart: 0, insetInlineEnd: 0, zIndex: 1 }}>
            <FilterButton onClick={handleFilterClick} />
          </Box>
        </Box>
      </TableContainer>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleFilterClose}
      >
        {orderDisplay ? (
          <MenuItem onClick={() => handleFilterSelect("ASC")}>ASC</MenuItem>
        ) : (
          <MenuItem onClick={() => handleFilterSelect("DESC")}>DSC</MenuItem>
        )}
        {/* {tableDisplay ? (
          <MenuItem onClick={() => handleFilterSelect("GRAPH")}>GRAPH</MenuItem>
        ) : (
          <MenuItem onClick={() => handleFilterSelect("TABLE")}>TABLE</MenuItem>
        )} */}
      </Menu>
    </Box>
  );
}
