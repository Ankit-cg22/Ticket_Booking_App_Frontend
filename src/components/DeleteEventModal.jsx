/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Box, Button, CircularProgress, Modal, Typography } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { BASE_BACKEND_URL, getAxiosConfig } from '../utils/requestUtils'

export default function DeleteEventModal({deleteModalOpen , setDeleteModalOpen, eventData, modalStyle , eventsList , setEventsList}) {
    const [loading , setLoading] = useState(false)
    const user = useSelector(state => {
        return state.authReducers.user
    })

    const deleteEvent=()=>{
        setLoading(true)
        axios.delete(`${BASE_BACKEND_URL}/events/deleteEvent/${eventData.eventId}` , getAxiosConfig(user.jwtToken))
        .then(res=>{
            alert(`Event : ${eventData.eventName} has been deleted successfully`)
            const newEventsList = eventsList.filter(event => event.eventId !== eventData.eventId)
            setEventsList(newEventsList)
            setDeleteModalOpen(false)
        })
        .catch(err=>{
            alert("Failed to delete the event.")
            console.log(err)
        })
        .finally(()=>{
            setLoading(false)
        })
    }
  return (
    <Modal
        open={deleteModalOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
            <Typography>Please confirm that you want to delete the following event : <b>{eventData.eventName}</b> </Typography>
            <div className='flex justify-between items-center mt-[1em]'>
                <Button className='w-[48%]' variant="contained" color="secondary" onClick={()=>deleteEvent()}>
                    {loading ? <CircularProgress size={25} style={{color : "white"}}/> : "Delete"}
                </Button>
                <Button className='w-[48%]' variant="contained" color="primary" onClick={() => setDeleteModalOpen(false)}>Cancel</Button>
            </div>
        </Box>
    </Modal>
  )
}
