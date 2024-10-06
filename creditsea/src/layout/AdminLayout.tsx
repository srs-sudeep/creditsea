import React, { useEffect, useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MessageIcon from '@mui/icons-material/Message';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import DynamicFormIcon from '@mui/icons-material/DynamicForm';
import { Avatar, Menu, MenuItem } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';
import { logoutAPi } from '../api';
const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
    height: '100vh', // Make sure the main content takes full height
    display: 'flex',
    flexDirection: 'column',
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function AdminLayout() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const handleLogout = async () => {
    try {
      console.log("hello");
      await logoutAPi();
      navigate('/login');
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }
  useEffect(() => {
    const index = pathToIndex[location.pathname];
    if (index !== undefined) {
      setSelectedIndex(index);
    }
  });

  const handleListItemClick = (index, path) => {
    setSelectedIndex(index);
    navigate(path);
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const pathToIndex = {
    '/admin/dashboard': 0,
    '/admin/borrowers': 1,
    '/admin/loans': 2,
    '/admin/createVerifier': 3,
    '/admin/viewVerifier': 4,
    '/admin/settings':5,
  };
  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, onClick: () => navigate('/admin/dashboard') },
    { text: 'Borrowers', icon: <PeopleIcon />, onClick: () => navigate('/admin/borrowers') },
    { text: 'Loans', icon: <AccountBalanceIcon />, onClick: () => navigate('/admin/loans') },
    { text: 'Create Verifiers', icon: <DynamicFormIcon />, onClick: () => navigate('/admin/createVerifier') },
    { text: 'View Verifiers', icon: <ConnectWithoutContactIcon />, onClick: () => navigate('/admin/viewVerifier') },
    { text: 'Settings', icon: <SettingsIcon />, onClick: () => navigate('/login') },
  ];
  const currentPath = location.pathname;
  const index = pathToIndex[currentPath];
  const title = index !== undefined ? menuItems[index].text : 'Admin Dashboard';
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ backgroundColor: 'white', color: 'black' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: 'none' }) }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <Typography variant="h5" noWrap component="div" sx={{ flexGrow: 1, color: '#0A512F', fontWeight: 'bold' }} className='font-bold'>
            ADMIN PANEL
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton color="inherit">
              <NotificationsIcon />
            </IconButton>
            <IconButton color="inherit">
              <MessageIcon />
            </IconButton>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <Avatar>A</Avatar>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            // backgroundColor: '#1B5E20',
            backgroundColor: '#132E1A',
            color: 'white',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader sx={{ backgroundColor: 'white' }} elevation={0} variant="temporary" open={open} onClose={handleDrawerClose}>
          <Typography variant="h5" noWrap component="div" sx={{ flexGrow: 1, color: '#0A512F', fontWeight: 'bold' }} className='font-bold'>
            CREDIT APP
          </Typography>
          <IconButton onClick={handleDrawerClose} sx={{ color: '#0A512F' }}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {menuItems.map((item, index) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                onClick={item.onClick}
                sx={{
                  backgroundColor: selectedIndex === index ? '#ADCF1A' : '#0A512F6B',
                  '&:hover': {
                    backgroundColor: '#0A512FE8',
                  },
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Elevation effect
                  borderRadius: '4px', // Add some border-radius
                  marginBottom: '8px', // Space between items
                  transition: 'background-color 0.3s ease',
                }}
              >
                <ListItemIcon sx={{ color: 'white' }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} sx={{ color: 'white' }} />
              </ListItemButton>
            </ListItem>
          ))}
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => handleLogout()}
              sx={{
                backgroundColor: '#0A512F6B',
                '&:hover': {
                  backgroundColor: '#0A512FE8',
                },
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                borderRadius: '4px',
                marginBottom: '8px',
                transition: 'background-color 0.3s ease',
              }}
            >
              <ListItemIcon sx={{ color: 'white' }}><ExitToAppIcon /></ListItemIcon>
              <ListItemText primary="Sign Out" sx={{ color: 'white' }} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Box sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          width: '100%'
        }}>
           <Typography variant="h4" className="mb-4" style={{ fontWeight: 'bold', textAlign: 'start',color: '#0A512F' }}>
           {title.toUpperCase()}
          </Typography>
          <Box sx={{ flexGrow: 1, width: '100%' }}>
            <Outlet />
          </Box>
        </Box>
      </Main>
    </Box>
  );
}
