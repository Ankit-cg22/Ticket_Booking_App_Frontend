/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Box, Button, CircularProgress, Modal, Typography } from '@mui/material'
import React, { useState } from 'react'
import List from './List'
import axios from 'axios'

export default function BookTicketModal({bookTicketModalOpen ,setBookTicketModalOpen , user , modalStyle , eventData}) {
    const ticketDetails = [
        {key : "Name" , value: user.name} ,
        {key : "Event Name" , value : eventData.eventName} , 
        {key : "Event Date" , value : eventData.eventDate }
    ]
    const [loading , setLoading] = useState(false)
    const BASE_BACKEND_URL = import.meta.env.VITE_BASE_BACKEND_URL

    const bookTicket = () => {
        const requestBody = {
            ticketData: {
                name : user.name , 
                eventId : eventData.eventId 
            },
            jwtToken : user.jwtToken
        }
        setLoading(true)
        axios.post(`${BASE_BACKEND_URL}/tickets/bookTicket` , requestBody)
        .then(res=>{
            const ticketId = res.data.data.ticketData.ticketId 
            alert(`Ticket booked successfully . Ticket Id is ${ticketId} . You will find this ticket in 'My Tickets' section.`)
            setBookTicketModalOpen(false)
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
    <Modal
        open={bookTicketModalOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Box sx={modalStyle}>
            <Typography align="center" variant="h5">Ticket Details</Typography>
            <List listItems={ticketDetails} />
            <div className='flex justify-between items-center mt-[1em]'>
                <Button className='w-[48%]' variant="contained" color="secondary" onClick={bookTicket}>
                    {loading ? <CircularProgress size={25} style={{color : "white"}}/> : "Confirm"}
                </Button>
                <Button disabled={loading} className='w-[48%]' variant="contained" color="primary" onClick={() => setBookTicketModalOpen(false)}>Cancel</Button>
            </div>
        </Box>
    </Modal>
  )
}
