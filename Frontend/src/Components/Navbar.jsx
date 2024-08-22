import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';

// Replace with the correct path to your logo image
import logo from '../Images/dataNova.png';

const NavBar = () => {
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="logo">
          <Box component="img" sx={{maxHeight: 40,}} alt="Logo" src={logo}/>
        </IconButton>
        <Box sx={{ flexGrow: 1 }} />
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
