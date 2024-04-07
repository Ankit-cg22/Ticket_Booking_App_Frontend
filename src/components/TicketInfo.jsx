/* eslint-disable no-unused-vars */
import { Button, CircularProgress, Paper, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import List from './List'
import { BASE_BACKEND_URL, getAxiosConfig } from '../utils/requestUtils'

export default function TicketInfo() {
    const [ticketId , setTicketId] = useState()
    const [loadingTicketInfoFetching , setLoadingTicketInfoFetching] = useState(false)
    const [loadingMarkingCheckedIn , setLoadingMarkingCheckedIn] = useState(false)
    const [ticketInfo , setTicketInfo] = useState([])
    const user = useSelector(state=>{
        return state.authReducers.user
    })

    const setTicketInfoState = (ticketData) =>{
        const ticketDataInfo = [
            {key : "Ticket Id" , value :ticketData.ticketId},
            {key:"Name" , value:ticketData.name} ,
            {key:"Event Id" , value : ticketData.eventId} , 
            {key:"Checked In" , value : ticketData.checkedIn==="0"? 'No' : 'Yes'}
        ]
        setTicketInfo(ticketDataInfo)
    }
    const handleFetchTicketInfo = (e) => {
        e.preventDefault()
        setLoadingTicketInfoFetching(true)
        axios.get(`${BASE_BACKEND_URL}/tickets/getTicketInfo/${ticketId}` , getAxiosConfig(user.jwtToken))
        .then(res=>{
            const ticketData = res.data.data.ticketData
            setTicketInfoState(ticketData)
        })
        .catch(err=>{
            const errorMessage = err.response.data.msg
            alert(errorMessage)
        })
        .finally(()=>{
            setLoadingTicketInfoFetching(false)
        })
    }

    const markCheckedIn = () =>{
        setLoadingMarkingCheckedIn(true)
        axios.get(`${BASE_BACKEND_URL}/tickets/markCheckedIn/${ticketId}` , getAxiosConfig(user.jwtToken) )
        .then(res=>{
            const ticketData = res.data.data.ticketData
            alert(`Ticket with ticketId=${ticketData.ticketId} has been succesfully marked 'Checked In'` )
            setTicketInfoState(ticketData)
        })
        .catch(err=>{
            alert("Failed to mark ticket as 'Checked In'.")
            console.log(err)
        })
        .finally(()=>{
            setLoadingMarkingCheckedIn(false)
        })
    }

   return (
    <div className='w-[30em] p-[1em] m-auto'>

        <div>
            <form onSubmit={handleFetchTicketInfo}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="Ticket ID"
                    name="ticketId"
                    onChange={(e)=>setTicketId(e.target.value)}
                    required
                />
                <Button fullWidth type="submit" variant="contained" color="primary" className="!mt-[1em]">
                    {loadingTicketInfoFetching ?
                        <CircularProgress size={25} style={{color : "white"}}/>
                    :
                        "Fetch Ticket Details"
                    }
                </Button>
            </form>
        </div>
        {ticketInfo.length ?
            <>
            <div className='mt-[1em] rounded-[0.5em] py-[0.5em] border-[2px] border-[#1565c0]'>
                <Typography align="center" variant="h5">Ticket Details</Typography>
                <List listItems = {ticketInfo}/>
            </div>  
            {user.isAdmin && ticketInfo[3].value==='No' && 
                <Button variant="contained" color="primary" fullWidth className="!mt-[1em]" onClick={markCheckedIn}>
                    {loadingMarkingCheckedIn ? 
                        <CircularProgress size={25} style={{color : "white"}}/>
                    :
                        "Mark Checked In"                
                    }
                </Button>
            }
            </>
            :
            <>  </>
        }
        
    </div>
  )
}
