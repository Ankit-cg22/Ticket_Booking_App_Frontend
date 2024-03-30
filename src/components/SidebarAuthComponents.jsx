/* eslint-disable no-unused-vars */
import React from 'react'
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { removeUser } from '../features/auth/authSlice';
import { Avatar, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
function SidebarAuthComponents({...rest}) {
    const dispatch = useDispatch();
    const user = useSelector(state => {
        return state.authReducers.user
    })
    const navigate = useNavigate(); 
    const handleLogout = () => {
        dispatch(removeUser())
        navigate("/auth")
    }
    const handleLogin = () => {
        navigate('/auth')
    }
    function stringToColor(string) {
        let hash = 0;
        let i;
        for (i = 0; i < string.length; i += 1) {
          hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }
      
        let color = '#';
      
        for (i = 0; i < 3; i += 1) {
          const value = (hash >> (i * 8)) & 0xff;
          color += `00${value.toString(16)}`.slice(-2);
        }
        return color;
      }
      
      function stringAvatar(name) {
        return {
          sx: {
            bgcolor: stringToColor(name),
          },
          children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
      }
    return (
        <div {...rest}>
            {user.name ? 
                <List className="h-[100%]">
                
                  <ListItem key={"username"} disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <Avatar {...stringAvatar(user.name)} />
                      </ListItemIcon>
                      <ListItemText primary={user.name} />
                    </ListItemButton>
                  </ListItem>
                  <ListItem key={"logout"} disablePadding onClick={handleLogout}>
                    <ListItemButton>
                      <ListItemIcon>
                        <LogoutIcon/>
                      </ListItemIcon>
                      <ListItemText primary={"Log Out"} />
                    </ListItemButton>
                  </ListItem>
                
              </List>
            :
                <ListItem key={"login"} disablePadding onClick={handleLogin}>
                    <ListItemButton>
                    <ListItemIcon>
                        <LoginIcon/>
                    </ListItemIcon>
                    <ListItemText primary={"Log In"} />
                    </ListItemButton>
                </ListItem>
            }
        </div>
    )
}

export default SidebarAuthComponents