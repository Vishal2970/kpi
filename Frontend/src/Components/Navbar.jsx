// import React, { useContext, useState } from "react";
// import { parse } from "date-fns";
// import AppBar from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
// import IconButton from "@mui/material/IconButton";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Box from "@mui/material/Box";
// import logo from "../Images/dataNova.png";
// import Button from "@mui/material/Button";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogTitle from "@mui/material/DialogTitle";
// import Grid from "@mui/material/Grid";
// import Divider from "@mui/material/Divider";
// import { FilterContext } from "../Context/filterProvider";
// import { useAuthContext } from "../Context/authContext";
// import { useNavigate } from "react-router-dom";
// import loginpic from "../Images/login.jpg";
// import filterpic from "../Images/filter.png";
// import Checkbox from "@mui/material/Checkbox";

// const NavBar = () => {
//   const { selectedFilter, setSelectedFilter } = useContext(FilterContext);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const open = Boolean(anchorEl);
//   const [openModal, setOpenModal] = useState(false);
//   const [openCalendar, setOpenCalendar] = useState(false);
//   const { auth, setAuth } = useAuthContext();
//   const isAuthenticated = Boolean(auth.token);
//   const havingShopNumber = Boolean(auth.coshopno);
//   const [openShopPopup, setOpenShopPopup] = useState(false);
//   const [strShopSelected, setStrShopSelected] = useState([]);
//   const [isValidDate, setIsValidDate] = useState(false);
//   const navigate = useNavigate();

//   // let Shopstr;

//   const handleLogOut = () => {
//     navigate("/");
//     sessionStorage.clear();
//     setAuth({
//       token: null,
//       coshopno: [],
//     });
//     handleClose();
//   };

//   const parsedDate = isValidDate
//     ? parse(selectedFilter.date, "yyyy-MM-dd", new Date())
//     : null;

//   const handleDateChange = (date) => {
//     setSelectedFilter({
//       ...selectedFilter,
//       date: date.toISOString().split("T")[0],
//     });
//     setOpenCalendar(false);
//   };

//   const handleLoadShop = () => {
//     handleModalClose();
//     console.log("Here");
    
//     console.log(parse(selectedFilter.date, "yyyy-MM-dd", new Date()));
//     setSelectedFilter({
//       ...selectedFilter,
//       shop: strShopSelected.join(","),
//     });
//   };

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const handleModalOpen = () => {
//     setOpenModal(true);
//   };

//   const handleModalClose = () => {
//     setOpenModal(false);
//     handleClose();
//   };

//   const handleDateClick = () => {
//     setOpenCalendar(true);
//   };

//   // let parsedDate;
//   // if (selectedFilter.date) {
//   //   parsedDate = parse(selectedFilter.date, "dd-MM-yyyy", new Date());
//   // } else {
//   //   parsedDate = new Date();
//   // }

//   // const isValidDate = !isNaN(parsedDate.getTime());

//   return (
//     <AppBar position="static" color="transparent" elevation={0}>
//       <Toolbar>
//         <IconButton edge="start" color="inherit" aria-label="logo">
//           <Box component="img" sx={{ blockSize: 40 }} alt="Logo" src={logo} />
//         </IconButton>
//         <Box sx={{ flexGrow: 1 }} />
//         {isAuthenticated && (
//           <Box sx={{ display: "flex", alignItems: "center" }}>
//             <Button
//               id="filter-button"
//               aria-controls={open ? "filter-menu" : undefined}
//               aria-haspopup="true"
//               aria-expanded={open ? "true" : undefined}
//               onClick={handleModalOpen}
//             >
//               <img
//                 src={filterpic}
//                 alt="user"
//                 style={{
//                   inlineSize: 50,
//                   blockSize: 30,
//                   objectFit: "cover",
//                   position: "relative",
//                   insetBlockStart: 25,
//                 }}
//               />
//             </Button>
//             <Button
//               id="logout-button"
//               aria-controls={open ? "basic-menu" : undefined}
//               aria-haspopup="true"
//               aria-expanded={open ? "true" : undefined}
//               onClick={handleClick}
//             >
//               <img
//                 src={loginpic}
//                 alt="user"
//                 style={{
//                   inlineSize: 50,
//                   blockSize: 30,
//                   objectFit: "cover",
//                   position: "relative",
//                   insetBlockStart: 25,
//                 }}
//               />
//             </Button>
//             <Menu
//               id="basic-menu"
//               anchorEl={anchorEl}
//               open={open}
//               onClose={handleClose}
//               MenuListProps={{
//                 "aria-labelledby": "basic-button",
//               }}
//             >
//               <MenuItem onClick={handleLogOut}>LogOut</MenuItem>
//             </Menu>
//             <Dialog
//               open={openModal}
//               onClose={handleModalClose}
//               sx={{
//                 "& .MuiDialogContent-root": {
//                   blockSize: "400px",
//                   inlineSize: "500px",
//                 },
//               }}
//             >
//               <DialogTitle>Filter</DialogTitle>
//               <DialogContent>
//                 <Grid container spacing={-10}>
//                   <Grid item xs={4}>
//                     <Button
//                       variant="outlined"
//                       fullWidth
//                       onClick={() => setOpenShopPopup(true)}
//                     >
//                       {selectedFilter.shop.split(",").length > 2
//                         ? `${selectedFilter.shop
//                             .split(",")
//                             .slice(0, 2)
//                             .join(", ")}...`
//                         : selectedFilter.shop || "Shop Number"}
//                     </Button>
//                     {openShopPopup && (
//                       <Dialog
//                         open={openShopPopup}
//                         onClose={() => setOpenShopPopup(false)}
//                       >
//                         <DialogContent>
//                           <Grid container spacing={2}>
//                             {havingShopNumber ? (
//                               auth.coshopno.split(",").map((shop, index) => (
//                                 <Grid item key={index}>
//                                   <FormControlLabel
//                                     control={
//                                       <Checkbox
//                                         value={shop}
//                                         checked={strShopSelected.includes(shop)}
//                                         onChange={(e) => {
//                                           if (e.target.checked) {
//                                             setStrShopSelected((prevShops) => [
//                                               ...prevShops,
//                                               shop,
//                                             ]);
//                                           } else {
//                                             setStrShopSelected((prevShops) =>
//                                               prevShops.filter(
//                                                 (s) => s !== shop
//                                               )
//                                             );
//                                           }
//                                         }}
//                                       />
//                                     }
//                                     label={shop}
//                                   />
//                                 </Grid>
//                               ))
//                             ) : (
//                               <Grid>No Shop Assigned</Grid>
//                             )}
//                           </Grid>
//                           <Button onClick={() => setOpenShopPopup(false)}>
//                             ok
//                           </Button>
//                         </DialogContent>
//                       </Dialog>
//                     )}
//                   </Grid>
//                   <Grid item xs={4}>
//                     <Divider orientation="vertical" />
//                   </Grid>
//                   <Grid item xs={4}>
//                     <Button
//                       variant="outlined"
//                       fullWidth
//                       onClick={handleDateClick}
//                     >
//                       {selectedFilter.date || "select date"}
//                     </Button>
//                     {openCalendar && (
//                       // <DatePicker
//                       //   selected={isValidDate ? parsedDate : new Date()}
//                       //   onChange={handleDateChange}
//                       //   dateFormat="dd/MM/yyyy"
//                       //   inline
//                       // />
//                       <DatePicker
//                         selected={parsedDate}
//                         onChange={handleDateChange}
//                         dateFormat="dd/MM/yyyy"
//                         inline
//                       />
//                     )}
//                   </Grid>
//                 </Grid>
//               </DialogContent>
//               <DialogActions>
//                 <Button onClick={handleModalClose}>Cancel</Button>
//                 <Button onClick={handleLoadShop}>OK</Button>
//               </DialogActions>
//             </Dialog>
//           </Box>
//         )}
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default NavBar;




// import React, { useContext, useState } from "react";
// import { parse } from "date-fns";
// import AppBar from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
// import IconButton from "@mui/material/IconButton";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Box from "@mui/material/Box";
// import logo from "../Images/dataNova.png";
// import Button from "@mui/material/Button";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogTitle from "@mui/material/DialogTitle";
// import Grid from "@mui/material/Grid";
// import Divider from "@mui/material/Divider";
// import { FilterContext } from "../Context/filterProvider";
// import { useAuthContext } from "../Context/authContext";
// import { useNavigate } from "react-router-dom";
// import loginpic from "../Images/login.jpg";
// import filterpic from "../Images/filter.png";
// import Checkbox from "@mui/material/Checkbox";

// const NavBar = () => {
//   const { selectedFilter, setSelectedFilter } = useContext(FilterContext);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const open = Boolean(anchorEl);
//   const [openModal, setOpenModal] = useState(false);
//   const [openCalendar, setOpenCalendar] = useState(false);
//   const { auth, setAuth } = useAuthContext();
//   const isAuthenticated = Boolean(auth.token);
//   const havingShopNumber = Boolean(auth.coshopno);
//   const [openShopPopup, setOpenShopPopup] = useState(false);
//   const [strShopSelected, setStrShopSelected] = useState([]);
//   const [isValidDate, setIsValidDate] = useState(false);
//   const [tempDate, setTempDate] = useState(null); // Local state for handling date
//   const navigate = useNavigate();

//   const handleLogOut = () => {
//     navigate("/");
//     sessionStorage.clear();
//     setAuth({
//       token: null,
//       coshopno: [],
//     });
//     handleClose();
//   };

//   const parsedDate = isValidDate
//     ? parse(selectedFilter.date, "yyyy-MM-dd", new Date())
//     : null;

//   const handleDateChange = (date) => {
//     setTempDate(date); // Set the temporary date state instead of updating the main filter
//   };

//   const handleLoadShop = () => {
//     // Update the filter with the selected date only when "OK" is clicked
//     setSelectedFilter({
//       ...selectedFilter,
//       date: tempDate ? tempDate.toISOString().split("T")[0] : selectedFilter.date,
//       shop: strShopSelected.join(","),
//     });
//     handleModalClose();
//   };

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const handleModalOpen = () => {
//     setOpenModal(true);
//   };

//   const handleModalClose = () => {
//     setOpenModal(false);
//     handleClose();
//   };

//   const handleDateClick = () => {
//     setOpenCalendar(true);
//   };

//   return (
//     <AppBar position="static" color="transparent" elevation={0}>
//       <Toolbar>
//         <IconButton edge="start" color="inherit" aria-label="logo">
//           <Box component="img" sx={{ blockSize: 40 }} alt="Logo" src={logo} />
//         </IconButton>
//         <Box sx={{ flexGrow: 1 }} />
//         {isAuthenticated && (
//           <Box sx={{ display: "flex", alignItems: "center" }}>
//             <Button
//               id="filter-button"
//               aria-controls={open ? "filter-menu" : undefined}
//               aria-haspopup="true"
//               aria-expanded={open ? "true" : undefined}
//               onClick={handleModalOpen}
//             >
//               <img
//                 src={filterpic}
//                 alt="user"
//                 style={{
//                   inlineSize: 50,
//                   blockSize: 30,
//                   objectFit: "cover",
//                   position: "relative",
//                   insetBlockStart: 25,
//                 }}
//               />
//             </Button>
//             <Button
//               id="logout-button"
//               aria-controls={open ? "basic-menu" : undefined}
//               aria-haspopup="true"
//               aria-expanded={open ? "true" : undefined}
//               onClick={handleClick}
//             >
//               <img
//                 src={loginpic}
//                 alt="user"
//                 style={{
//                   inlineSize: 50,
//                   blockSize: 30,
//                   objectFit: "cover",
//                   position: "relative",
//                   insetBlockStart: 25,
//                 }}
//               />
//             </Button>
//             <Menu
//               id="basic-menu"
//               anchorEl={anchorEl}
//               open={open}
//               onClose={handleClose}
//               MenuListProps={{
//                 "aria-labelledby": "basic-button",
//               }}
//             >
//               <MenuItem onClick={handleLogOut}>LogOut</MenuItem>
//             </Menu>
//             <Dialog
//               open={openModal}
//               onClose={handleModalClose}
//               sx={{
//                 "& .MuiDialogContent-root": {
//                   blockSize: "400px",
//                   inlineSize: "500px",
//                 },
//               }}
//             >
//               <DialogTitle>Filter</DialogTitle>
//               <DialogContent>
//                 <Grid container spacing={-10}>
//                   <Grid item xs={4}>
//                     <Button
//                       variant="outlined"
//                       fullWidth
//                       onClick={() => setOpenShopPopup(true)}
//                     >
//                       {selectedFilter.shop.split(",").length > 2
//                         ? `${selectedFilter.shop
//                             .split(",")
//                             .slice(0, 2)
//                             .join(", ")}...`
//                         : selectedFilter.shop || "Shop Number"}
//                     </Button>
//                     {openShopPopup && (
//                       <Dialog
//                         open={openShopPopup}
//                         onClose={() => setOpenShopPopup(false)}
//                       >
//                         <DialogContent>
//                           <Grid container spacing={2}>
//                             {havingShopNumber ? (
//                               auth.coshopno.split(",").map((shop, index) => (
//                                 <Grid item key={index}>
//                                   <FormControlLabel
//                                     control={
//                                       <Checkbox
//                                         value={shop}
//                                         checked={strShopSelected.includes(shop)}
//                                         onChange={(e) => {
//                                           if (e.target.checked) {
//                                             setStrShopSelected((prevShops) => [
//                                               ...prevShops,
//                                               shop,
//                                             ]);
//                                           } else {
//                                             setStrShopSelected((prevShops) =>
//                                               prevShops.filter(
//                                                 (s) => s !== shop
//                                               )
//                                             );
//                                           }
//                                         }}
//                                       />
//                                     }
//                                     label={shop}
//                                   />
//                                 </Grid>
//                               ))
//                             ) : (
//                               <Grid>No Shop Assigned</Grid>
//                             )}
//                           </Grid>
//                           <Button onClick={() => setOpenShopPopup(false)}>
//                             ok
//                           </Button>
//                         </DialogContent>
//                       </Dialog>
//                     )}
//                   </Grid>
//                   <Grid item xs={4}>
//                     <Divider orientation="vertical" />
//                   </Grid>
//                   <Grid item xs={4}>
//                     <Button
//                       variant="outlined"
//                       fullWidth
//                       onClick={handleDateClick}
//                     >
//                       {tempDate
//                         ? tempDate.toISOString().split("T")[0]
//                         : selectedFilter.date || "select date"}
//                     </Button>
//                     {openCalendar && (
//                       <DatePicker
//                         selected={tempDate || new Date()}
//                         onChange={handleDateChange}
//                         dateFormat="dd/MM/yyyy"
//                         inline
//                       />
//                     )}
//                   </Grid>
//                 </Grid>
//               </DialogContent>
//               <DialogActions>
//                 <Button onClick={handleModalClose}>Cancel</Button>
//                 <Button onClick={handleLoadShop}>OK</Button>
//               </DialogActions>
//             </Dialog>
//           </Box>
//         )}
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default NavBar;


import React, { useContext, useState, useRef, useEffect } from "react";
import { parse } from "date-fns";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import FormControlLabel from "@mui/material/FormControlLabel";
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
import loginpic from "../Images/login.jpg";
import filterpic from "../Images/filter.png";
import Checkbox from "@mui/material/Checkbox";

const NavBar = () => {
  const { selectedFilter, setSelectedFilter } = useContext(FilterContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [openModal, setOpenModal] = useState(false);
  const [openCalendar, setOpenCalendar] = useState(false);
  const [tempDate, setTempDate] = useState(selectedFilter.date ? parse(selectedFilter.date, "yyyy-MM-dd", new Date()) : new Date());
  const { auth, setAuth } = useAuthContext();
  const isAuthenticated = Boolean(auth.token);
  const havingShopNumber = Boolean(auth.coshopno);
  const [openShopPopup, setOpenShopPopup] = useState(false);
  const [strShopSelected, setStrShopSelected] = useState([]);
  const navigate = useNavigate();
  const calendarRef = useRef(null);

  // Handle logout
  const handleLogOut = () => {
    navigate("/");
    sessionStorage.clear();
    setAuth({
      token: null,
      coshopno: [],
    });
    handleClose();
  };

  // Handle date change temporarily
  const handleDateChange = (date) => {
    setTempDate(date);
  };

  // Set the selected filter date only on OK button click
  const handleLoadShop = () => {
    setSelectedFilter({
      ...selectedFilter,
      date: tempDate.toISOString().split("T")[0],
      shop: strShopSelected.join(","),
    });
    setOpenCalendar(false);
    handleModalClose();
  };

  // Open and close handlers
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleModalOpen = () => setOpenModal(true);
  const handleModalClose = () => {
    setOpenModal(false);
    handleClose();
  };
  const handleDateClick = () => setOpenCalendar(true);

  // Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setOpenCalendar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="logo">
          <Box component="img" sx={{ blockSize: 40 }} alt="Logo" src={logo} />
        </IconButton>
        <Box sx={{ flexGrow: 1 }} />
        {isAuthenticated && (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Button id="filter-button" aria-controls={open ? "filter-menu" : undefined} aria-haspopup="true" aria-expanded={open ? "true" : undefined} onClick={handleModalOpen}>
              <img src={filterpic} alt="user" style={{ inlineSize: 50, blockSize: 30, objectFit: "cover", position: "relative", insetBlockStart: 25 }} />
            </Button>
            <Button id="logout-button" aria-controls={open ? "basic-menu" : undefined} aria-haspopup="true" aria-expanded={open ? "true" : undefined} onClick={handleClick}>
              <img src={loginpic} alt="user" style={{ inlineSize: 50, blockSize: 30, objectFit: "cover", position: "relative", insetBlockStart: 25 }} />
            </Button>
            <Menu id="basic-menu" anchorEl={anchorEl} open={open} onClose={handleClose} MenuListProps={{ "aria-labelledby": "basic-button" }}>
              <MenuItem onClick={handleLogOut}>LogOut</MenuItem>
            </Menu>
            <Dialog open={openModal} onClose={handleModalClose} sx={{ "& .MuiDialogContent-root": { blockSize: "400px", inlineSize: "500px" } }}>
              <DialogTitle>Filter</DialogTitle>
              <DialogContent>
                <Grid container spacing={-10}>
                  <Grid item xs={4}>
                    <Button variant="outlined" fullWidth onClick={() => setOpenShopPopup(true)}>
                      {selectedFilter.shop.split(",").length > 2
                        ? `${selectedFilter.shop.split(",").slice(0, 2).join(", ")}...`
                        : selectedFilter.shop || "Shop Number"}
                    </Button>
                    {openShopPopup && (
                      <Dialog open={openShopPopup} onClose={() => setOpenShopPopup(false)}>
                        <DialogContent>
                          <Grid container spacing={2}>
                            {havingShopNumber ? (
                              auth.coshopno.split(",").map((shop, index) => (
                                <Grid item key={index}>
                                  <FormControlLabel
                                    control={
                                      <Checkbox
                                        value={shop}
                                        checked={strShopSelected.includes(shop)}
                                        onChange={(e) => {
                                          if (e.target.checked) {
                                            setStrShopSelected((prevShops) => [...prevShops, shop]);
                                          } else {
                                            setStrShopSelected((prevShops) => prevShops.filter((s) => s !== shop));
                                          }
                                        }}
                                      />
                                    }
                                    label={shop}
                                  />
                                </Grid>
                              ))
                            ) : (
                              <Grid>No Shop Assigned</Grid>
                            )}
                          </Grid>
                          <Button onClick={() => setOpenShopPopup(false)}>ok</Button>
                        </DialogContent>
                      </Dialog>
                    )}
                  </Grid>
                  <Grid item xs={4}>
                    <Divider orientation="vertical" />
                  </Grid>
                  <Grid item xs={4}>
                    <Button variant="outlined" fullWidth onClick={handleDateClick}>
                      {selectedFilter.date || "select date"}
                    </Button>
                    {openCalendar && (
                      <div ref={calendarRef}>
                        <DatePicker selected={tempDate} onChange={handleDateChange} dateFormat="dd/MM/yyyy" inline />
                      </div>
                    )}
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleModalClose}>Cancel</Button>
                <Button onClick={handleLoadShop}>OK</Button>
              </DialogActions>
            </Dialog>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
