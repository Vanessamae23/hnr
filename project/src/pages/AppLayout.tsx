import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Header from '../components/Header';
import AllMatched from './AllMatched';
import MyTimetable from './MyTimetable';
import Home from './Home';
import AllFriends from './AllFriends';
import Config from './Config';
import { useNavigate, Link } from 'react-router-dom';

const drawerWidth = 240;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window?: () => Window;
  component: React.ReactNode;
}

export default function AppLayout(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const pages = [
    {
      name: 'My Timetable',
      component: <MyTimetable />,
      path: '/timetable',
    },
    {
      name: 'Friends\' timetables',
      component: <AllFriends />,
      path: '/friends',
    },
    {
      name: 'Configurations',
      component: <Config />,
      path: '/config',
    }
  ]

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {pages.map((page) => (
            <ListItem key={page.name} disablePadding>
              <Link to={page.path} style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItemButton>
                <ListItemIcon>
                </ListItemIcon>
              <ListItemText primary={page.name} />
            </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
      <Divider />
      
    </div>
  );

  // Remove this const when copying and pasting into your project.
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box >
      <Header />
      <Box sx={{ display: 'flex' }}>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }, height: '90vh', overflow: 'auto', zIndex:0 }}
          aria-label="mailbox folders"
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onTransitionEnd={handleDrawerTransitionEnd}
            onClose={handleDrawerClose}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              zIndex: 1,
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, marginTop: 10 },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{ flexGrow: 1, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
        >
          {props.component}
        </Box>
      </Box>
    </Box>

  );
}
