import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

// @ts-ignore
import Icon from '../assets/mchef.png'
import CustomButton from './CustomButton';
import { User } from 'firebase/auth';
import { getCurrentUser, logout } from '../backend/commands';
import { useNavigate } from 'react-router-dom';

// ... (imports)

export default function Header() {
    const [user, setUser] = React.useState<User | null>(null);
    const [authChanged, setAuthChanged] = React.useState(false);
    const navigate = useNavigate();
  
    React.useEffect(() => {
      getCurrentUser().then((res) => {
        setUser(res);
      });
    }, [user, authChanged]);
  
    const handleAuthChange = React.useCallback(() => {
      // Toggle the state to trigger re-render
      setAuthChanged((prev) => !prev);
    }, []);
  
    return (
      <AppBar position="static" sx={{ flexDirection: 'row', background: "#fff", width: '100%' }}>
        <Toolbar sx={{ zIndex: 2, display:'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
          <Box sx={{ zIndex: 2, display:'flex', flexDirection: 'row', justifyContent: 'space-between' }} >
            <img src={Icon} width="100%" height="50px" />
            <img src={Icon} width="100%" height="50px" />
          </Box>
          <Box>
            <CustomButton label={user === null ? "Login" : "Logout"} onClick={() => user === null ? navigate('/login') : logout(handleAuthChange)} />
            {user === null && (<CustomButton label="Register" onClick={() => navigate('/register')} />)}
          </Box>
        </Toolbar>
      </AppBar>
    );
  }
  