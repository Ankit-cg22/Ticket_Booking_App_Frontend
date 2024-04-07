/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Container,
  CircularProgress,
} from '@mui/material';
import axios from 'axios';
import { useSelector } from 'react-redux'
import { BASE_BACKEND_URL, getAxiosConfig } from '../utils/requestUtils';

export default function AddEvent() {
    const [loading , setLoading] = useState(false)
    const user = useSelector(state => {
        return state.authReducers.user
    })
    const [formData, setFormData] = useState({
        eventName : "", 
        eventDescription:"" ,
        eventDate :"" ,
        totalTickets:""
    });
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = (e) =>{
        e.preventDefault()
        setLoading(true)
        const requestBody = {
            eventData : formData 
        }
        axios.post(`${BASE_BACKEND_URL}/events/createEvent`  , requestBody , getAxiosConfig(user.jwtToken))
        .then(res=>{
            const data = res.data 
            setFormData({
                eventName : "", 
                eventDescription:"" ,
                eventDate :"" ,
                totalTickets:""
            });
            alert("Event added successfully")
        })
        .catch(err=>{
            const errorMessage = err.response.data.msg
            alert(errorMessage)
        })
        .finally(()=>{
            setLoading(false)
        })
    }
    return (
        <Container component="main" maxWidth="xs" >
          <Typography align="center" variant="h5">Add Event</Typography>
          <form onSubmit={handleSubmit}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  label="Event Name"
                  name="eventName"
                  value={formData.eventName}
                  onChange={handleInputChange}
                  required
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  label="Event Description"
                  name="eventDescription"
                  value={formData.eventDescription}
                  onChange={handleInputChange}
                  required
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="Event Date"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleInputChange}
                    required
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="Total Tickets"
                    name="totalTickets"
                    type="number"
                    value={formData.totalTickets}
                    onChange={handleInputChange}
                    required
                />
            
                
                <Button type="submit" fullWidth variant="contained" color="primary" className="!mt-[1em]">
                {
                    loading ? 
                    <CircularProgress size={25} style={{color : "white"}}/>
        
                    :
                    <div>Add Event</div>
                }
        
                </Button>
            
          </form>
          
        </Container>
  )
}