import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

// @ts-ignore
import Icon from '../assets/mchef.png'

export default function Header() {
  return (
      <AppBar position="static" sx={{ flexDirection: 'row', alignItems: 'flex-start', background: "#fff", width: '100%'}}>
        <Toolbar sx={{ zIndex: 2}}>
          <img src={Icon} width="100%" height="50px" />
          <img src={Icon} width="100%" height="50px" />
        </Toolbar>
      </AppBar>
  );
}