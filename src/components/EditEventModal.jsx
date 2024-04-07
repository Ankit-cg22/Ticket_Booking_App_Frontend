/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Box, Button, CircularProgress, Modal, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_BACKEND_URL, getAxiosConfig } from '../utils/requestUtils';
export default function EditEventModal({editModalOpen , setEditModalOpen , formData , setFormData ,eventsList, setEventsList , modalStyle}) {
    const [loading , setLoading] = useState()
    
    const handleInputChange = async (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    };
    const user = useSelector(state => {
      return state.authReducers.user 
    })

  const handleSubmit = (e)=>{
    e.preventDefault()
    const requestBody = {
      eventData : {
        eventId : formData.eventId , 
        eventName : formData.eventName , 
        eventDescription : formData.eventDescription , 
        eventDate : formData.eventDate , 
        totalTickets : formData.totalTickets 
      }
    }
    setLoading(true)
    axios.post(`${BASE_BACKEND_URL}/events/updateEvent/${formData.eventId}` , requestBody , getAxiosConfig(user.jwtToken))
    .then(res=>{
      alert(res.data.msg)
      const updatedEvent = res.data.eventData
      updatedEvent['eventDate'] = updatedEvent['eventDate'].split('T')[0]
      const updatedEventsList = eventsList.map((event)=>{
        if(event.eventId === updatedEvent.eventId)return updatedEvent 
        return event
      })
      setEventsList(updatedEventsList)
      setEditModalOpen(false)
    })
    .catch(err=>{
      console.log(err)
    })
    .finally(()=>{
      setLoading(false)
    })
  }
  return (
    <Modal
        open={editModalOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <div className='relative'>
            <Typography align="center" variant="h5">Update Event</Typography>
            <Button variant="text" className='!p-0 !min-w-[0px] !absolute right-0 top-[0.4em]' onClick={()=>setEditModalOpen(false)}><CloseIcon/></Button>
          </div>
          <form onSubmit={handleSubmit}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  label="Event Name"
                  name="eventName"
                  defaultValue={formData.eventName}
                  onChange={handleInputChange}
                  required
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  label="Event Description"
                  name="eventDescription"
                  defaultValue={formData.eventDescription}
                  onChange={handleInputChange}
                  required
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="Event Date(YYYY-MM-DD)"
                    name="eventDate"
                    defaultValue={formData.eventDate}
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
                    defaultValue={formData.totalTickets}
                    onChange={handleInputChange}
                    required
                />
            
                
                <Button type="submit" fullWidth variant="contained" color="primary" className="!mt-[1em]">
                {
                    loading ? 
                    <CircularProgress size={25} style={{color : "white"}}/>
        
                    :
                    <div>Update Event</div>
                }
        
                </Button>
            
          </form>

        </Box>
      </Modal>
  )
}
