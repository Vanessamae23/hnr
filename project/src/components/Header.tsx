import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

// @ts-ignore
import logoModMatch from '../assets/modmatch-logo.png';

export default function Header() {
  return (
    <AppBar sx={{ flexDirection: 'row', alignItems: 'center', background: "#fff", width: '100%', backgroundColor: "#F3F3F3"}} elevation={0}>
      <Toolbar sx={{ zIndex: 2, justifyContent: 'center', alignItems: 'center'}}>
        <Box sx={{display: 'flex', alignItems: 'auto'}}>
          <img src={logoModMatch} alt="ModMatch logo" style={{ height: 50, width: 'auto' }}/>
        </Box>
      </Toolbar>
    </AppBar>
  );
}