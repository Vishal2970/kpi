import React, { useContext, useState } from "react";
import { parse } from "date-fns";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import logo from "../Images/dataNova.png";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import { FilterContext } from "../Context/filterProvider";
import { useAuthContext } from "../Context/authContext";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  //const [selectedDate, setSelectedDate] = useState(new Date());
  const { selectedFilter, setSelectedFilter } = useContext(FilterContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [openModal, setOpenModal] = useState(false);
  const [openCalendar, setOpenCalendar] = useState(false);
  const { auth, setAuth } = useAuthContext();
  const isAuthenticated = Boolean(auth.token);
  const navigate = useNavigate();

  const handleLogOut = () => {
    navigate("/");
    sessionStorage.clear();
    setAuth({
      token: null,
      coshopno: null,
    });
    handleClose();
  };
  const handleDateChange = (date) => {
    setSelectedFilter({
      ...selectedFilter,
      date: date.toISOString().split("T")[0],
    });
    setOpenCalendar(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleDateClick = () => {
    setOpenCalendar(true);
  };

  let parsedDate;
  if (selectedFilter.date) {
    parsedDate = parse(selectedFilter.date, "dd-MM-yyyy", new Date());
  } else {
    parsedDate = new Date();
  }
  const isValidDate = !isNaN(parsedDate.getTime());
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="logo">
          <Box component="img" sx={{ blockSize: 40 }} alt="Logo" src={logo} />
        </IconButton>
        <Box sx={{ flexGrow: 1 }} />
        {isAuthenticated ? (
          <Box sx={{ blockSize: 20 }}>
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              User
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleModalOpen}>Filter</MenuItem>
              <MenuItem onClick={handleLogOut}>LogOut</MenuItem>
            </Menu>
            <Dialog
              open={openModal}
              onClose={handleModalClose}
              sx={{
                "& .MuiDialogContent-root": {
                  blockSize: "400px", // Adjusted filter model size
                  inlineSize: "500px", // Adjusted filter model size
                },
              }}
            >
              <DialogTitle>Filter</DialogTitle>
              <DialogContent>
                <Grid container spacing={-10}>
                  <Grid item xs={4}>
                    <Button variant="outlined" fullWidth>
                      Button 1
                    </Button>
                  </Grid>
                  <Grid item xs={4}>
                    <Divider orientation="vertical" />
                  </Grid>
                  <Grid item xs={4}>
                    <Button
                      variant="outlined"
                      fullWidth
                      onClick={handleDateClick}
                    >
                      {/* {selectedDate.toLocaleDateString()} */}
                      {selectedFilter.date || "select date"}
                    </Button>
                    {openCalendar && (
                      <DatePicker
                        // selected={selectedDate}
                        selected={isValidDate ? parsedDate : new Date()}
                        onChange={handleDateChange}
                        dateFormat="dd/MM/yyyy"
                        inline
                      />
                    )}
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleModalClose}>Cancel</Button>
                <Button onClick={handleModalClose}>OK</Button>
              </DialogActions>
            </Dialog>
          </Box>
        ) : (
          ""
        )}
      </Toolbar>
    </AppBar>
  );
};
export default NavBar;
