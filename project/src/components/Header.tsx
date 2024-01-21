import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import CustomButton from './CustomButton';
import { User } from 'firebase/auth';
import { getCurrentUser, login, logout, register } from '../backend/commands';
import { useNavigate } from 'react-router-dom';
// @ts-ignore
import Icon from '../assets/modmatch-logo.png';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, TextField, Typography, Container, Grid } from '@mui/material';

export default function Header() {
  const [user, setUser] = React.useState<User | null>(null);
  const [authChanged, setAuthChanged] = React.useState(false);
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  React.useEffect(() => {
    getCurrentUser().then((res) => {
      setUser(res);
    });
  }, [user, authChanged]);

  const handleAuthChange = React.useCallback(() => {
    // Toggle the state to trigger re-render
    setAuthChanged((prev) => !prev);
  }, []);

  const handleSubmitLogin = (e) => {
    login(email, password, handleAuthChange).then((res) => {
      alert("success")
      console.log(res)
      setOpen(false)
      navigate("/timetable");
    })
    navigate("/timetable");
  }

  const handleSubmitRegister = (e) => {
    register(email, password, handleAuthChange).then((res) => {
      alert("success")
      setUser(res)
      setOpen(false)
      navigate("/timetable");
    })
    navigate("/timetable");
  }

  return (
    <AppBar sx={{ flexDirection: 'row', alignItems: 'center', background: "#fff", width: '100%', backgroundColor: "#F3F3F3" }} elevation={0}>
      <Toolbar sx={{ zIndex: 2, justifyContent: 'space-between', alignItems: 'center', display: 'flex', flexDirection: 'row', width: '100%' }}>
        <Box sx={{ zIndex: 2, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }} >
          <img src={Icon} width="100%" height="50px" />
          <img src={Icon} width="100%" height="50px" />
        </Box>
        <Box>
          <CustomButton label={user === null ? "Login" : "Logout"} onClick={() => user === null ? setOpen(true) : logout(handleAuthChange)} />
          {user === null && (<CustomButton label="Register" onClick={() => setOpen(true)} />)}
        </Box>
      </Toolbar>
      <Dialog
        open={open}
        fullWidth
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <form>
          <DialogTitle id="alert-dialog-title">
            {"Login / Register"}
          </DialogTitle>
          <DialogContent>


            <Container maxWidth="sm" sx={{ height: "50vh", display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
              >
                <Typography variant="body2" color="#000" align="left">
                  Email
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Email"
                  margin="normal"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{ marginBottom: 4 }}
                  InputProps={{
                    style: {
                      borderRadius: "15px",
                    }
                  }}
                />
                <Typography variant="body2" color="#000" align="left">
                  Password
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Password"
                  type='password'
                  margin="normal"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  sx={{ marginBottom: 4 }}
                  InputProps={{
                    style: {
                      borderRadius: "15px",
                    }
                  }}
                />
                <Typography variant="body2" color="#CFCFCF" align="center">
                  Humbly brought to you by <Typography variant="body2" color="#FF3C3C" sx={{ fontWeight: "bold" }} display='inline'> AAC++</Typography>
                </Typography>
              </Grid>
            </Container>

          </DialogContent>
          <DialogActions>
            <Button onClick={handleSubmitLogin}>Login</Button>
            <Button onClick={handleSubmitRegister} autoFocus>
              Register
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </AppBar>
  );
}
