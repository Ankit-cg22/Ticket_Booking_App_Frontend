/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import SidebarAuthComponents from './SidebarAuthComponents';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import { AdminNavbarOptions, UserNavbarOptions } from '../utils/NavbarOptions.jsx';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';

const drawerWidth = 240;

export default function Sidebar({children}) {
  const navigate = useNavigate()
  const user = useSelector(state => {
    return state.authReducers.user 
  })
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
        
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
        // className='flex flex-col'
      >
        <Toolbar> <span className='mr-[0.5em] ml-[-0.5em]'> <LocalActivityIcon color="primary"/> </span> Ticket Booking App </Toolbar>
        <Divider />
        <List className="flex-1">
          {
            user.userId &&
            UserNavbarOptions.map((navbarOption, index) => (
              <ListItem key={index} disablePadding onClick={()=>navigate(navbarOption.link)}>
                <ListItemButton>
                  <ListItemIcon>
                    <navbarOption.icon/>
                  </ListItemIcon>
                  <ListItemText primary={navbarOption.text} />
                </ListItemButton>
              </ListItem>
            ))
          }
          {
            user.isAdmin && 
            <>
              <Divider/>
              {
                AdminNavbarOptions.map((navbarOption, index) => (
                  <ListItem key={index} disablePadding onClick={()=>navigate(navbarOption.link)}>
                    <ListItemButton>
                      <ListItemIcon>
                        <navbarOption.icon/>
                      </ListItemIcon>
                      <ListItemText primary={navbarOption.text} />
                    </ListItemButton>
                  </ListItem>
                ))
              }
            </>

          }
        </List>
        <Divider />
        <SidebarAuthComponents className="h-[fit-content]"/>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        {children}
      </Box>
    </Box>
  );
}