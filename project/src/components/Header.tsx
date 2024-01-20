import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

// @ts-ignore
import logoModMatch from '../assets/modmatch-logo.png';

export default function Header() {
  return (
    <AppBar position="static" sx={{ flexDirection: 'row', alignItems: 'flex-start', background: "#fff", width: '100%' }}>
      <Toolbar sx={{ zIndex: 2 }}>
        <Box
          component="img"
          sx={{ height: 50, width: "100%" }}
          mb={2}
          alt="ModMatch logo"
          src={logoModMatch}
        />
      </Toolbar>
    </AppBar>
  );
}