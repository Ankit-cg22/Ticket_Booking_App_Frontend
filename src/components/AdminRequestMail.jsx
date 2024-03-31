/* eslint-disable no-unused-vars */
import { Button, CircularProgress, TextField } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

export default function AdminRequestMail() {
  const [emailId , setEmailId] = useState()
  const [loading , setLoading] = useState(false)
  const user = useSelector(state=>{
    return state.authReducers.user
  })
  const BASE_BACKEND_URL = import.meta.env.VITE_BASE_BACKEND_URL

  const handleSendAdminRequestMail = (e) =>{
    e.preventDefault()
    const requestBody = {
        userData: {
            email : emailId
        },
        jwtToken : user.jwtToken
    }
    setLoading(true)
    axios.post(`${BASE_BACKEND_URL}/auth/sendAdminRequestMail` , requestBody)
    .then(res=>{
        alert(res.data.msg)
        setEmailId("")
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
    <div className='w-[30em] p-[1em] m-auto'>
        <div>
            <form onSubmit={handleSendAdminRequestMail}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="Email ID"
                    name="emailId"
                    type="email"
                    value={emailId}
                    onChange={(e)=>setEmailId(e.target.value)}
                    required
                />
                <Button fullWidth type="submit" variant="contained" color="primary" className="!mt-[1em]">
                    {loading ?
                        <CircularProgress size={25} style={{color : "white"}}/>
                    :
                        "Send Admin Request Mail"
                    }
                </Button>
            </form>
        </div>
    </div>
  )
}
