/* eslint-disable no-unused-vars */
import { Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function AdminRequestAcceptance() {
    const {token} = useParams()
    const [message , setMessage] = useState('')
    const BASE_BACKEND_URL = import.meta.env.VITE_BASE_BACKEND_URL
    useEffect(()=>{
        const requestBody = {token}
        setMessage("Please wait while we process your Admin role acceptance.Thank you for your patience.")
        axios.post(`${BASE_BACKEND_URL}/auth/adminRequestAcceptance` , requestBody)
        .then(res=>{
            setMessage(res.data.msg + ' Thank you for accepting Admin role.')
        })
        .catch(err=>{
            const errorMessage = err.response.data.msg
            setMessage(errorMessage)
        })
    },[])
  return (
    <div className='w-[30em] p-[1em] m-auto'>
        <Typography align="center" variant="h5">Admin Request Acceptance</Typography>
        <Typography align="center" className='!mt-[1em]'>{message}</Typography>
    </div>
  )
}
