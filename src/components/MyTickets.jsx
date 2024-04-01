/* eslint-disable no-unused-vars */
import { Card, Grid, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import List from './List'

function MyTickets() {
    const [loading , setLoading] = useState(false)
    const [ticketInfo , setTicketInfo] = useState([])
    const user = useSelector(state=>{
        return state.authReducers.user 
    })
    const BASE_BACKEND_URL = import.meta.env.VITE_BASE_BACKEND_URL
    
    useEffect(()=>{
        const requestBody = {
            jwtToken : user.jwtToken
        }
        setLoading(true)
        axios.post(`${BASE_BACKEND_URL}/tickets/getAllTickets/${user.userId}` , requestBody)
        .then(res=>{
            const ticketInfo = res.data.data 
            setTicketInfo(ticketInfo)
        })
        .catch(err=>{
            // console.log(err)
            alert("Failed to fetch your tickets.")
        })
        .finally(()=>{
            setLoading(false)
        })

    },[])

  return (
    <>
    <div className='!mb-[1em]'>My Tickets</div>
    <Grid container spacing={2}>
    {
        loading ?
        <Typography className='!ml-[1em] !mt-[1em]'>Loading your tickets...</Typography>
        :
        ticketInfo.length === 0 ?
        <Typography className='!ml-[1em] !mt-[1em]'>You have no tickets.</Typography>
        :
        ticketInfo.map((ticket , index)=>{
            const ticketInfoList = [
                {key : "Ticket ID" , value : ticket.ticketId }, 
                {key : "Name" , value:ticket.name} ,
                {key : "Event ID" , value :ticket.eventId} , 
                {key : "Checked In" , value:ticket.checkedIn === "0" ? 'No' : 'Yes'}
            ]
            return (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Card sx={{ maxWidth: 345 }}>
                    <List listItems={ticketInfoList}/>
                </Card>
            </Grid>
        )})
    }
    </Grid>
    </>
  )
}

export default MyTickets