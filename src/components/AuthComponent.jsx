/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Container,
  CircularProgress,
  Modal,
  Box,
  Paper,
} from '@mui/material';
import axios from 'axios';
import { useDispatch } from 'react-redux'
import { addUser } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_BACKEND_URL } from '../utils/requestUtils';

const AuthComponent = () => {
  const [loading , setLoading] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(true);
  const [registeredUser , setRegisteredUser] = useState(null)
  const [OTPVerification , setOTPVerification] = useState(false)
  const [OTP , setOTP] = useState(null)
  const [formData, setFormData] = useState({
    name:'',
    email: '',
    password: '',
  });
  
  const handleFormSwitch = () => {
    setIsLogin((prev) => !prev);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    if(isLogin){
      setLoading(true)
      axios.post(`${BASE_BACKEND_URL}/auth/login` , formData)
      .then(res => {
        const data = res.data
        const user = {
          ...data.userData , 
          jwtToken : data.jwtToken
        }
        dispatch(addUser({user : user}))
        navigate('/')
      })
      .catch(err => {
        // console.log(err)
        const errorMessage = err.response.data.msg
        alert(errorMessage)
      })
      .finally(()=>{
        setLoading(false)

      })
    }
    else{
      setLoading(true)
      
      axios.post(`${BASE_BACKEND_URL}/auth/register` , formData)
      .then(res => {
        const data = res.data
        const user = data.userData 
        setRegisteredUser(user)
        setOTPVerification(true)
      })
      .catch(err => {
        // console.log(err)
        const errorMessage = err.response.data.msg
        alert(errorMessage)
      })
      .finally(()=>{
        setLoading(false)
      })
    }
  };

  const validateOTP = (e) =>{
    e.preventDefault();
    const requestData = {
      userId : registeredUser.userId , 
      otp :  OTP 
    }
    setLoading(true)
    axios.post(`${BASE_BACKEND_URL}/auth/verifyOTP` , requestData)
    .then(res => {
      const data = res.data 
      const user = {
        ...data.userData , 
        jwtToken : data.jwtToken
      }
      dispatch(addUser({user : user}))
      setOTPVerification(false)
      navigate('/')
    })
    .catch(err =>{
      // console.log(err)
      const errorMessage = err.response.data.msg
      alert(errorMessage)
    })
    .finally(()=>{
      setLoading(false)
    })
  }

  if(OTPVerification){
    return(
      <Paper className="w-[500px] m-auto p-[1em] text-center">
        <Typography id="modal-modal-title" variant="h6" component="h2">
          OTP Verification
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Please enter the OTP sent to your email address : <b>{registeredUser.email}</b>
        </Typography>
        <form onSubmit={validateOTP}>
          <div>
            <TextField
              variant="outlined"
              margin="normal"
              label="OTP"
              name="otp"
              onChange={(e) => setOTP(e.target.value) }
              required
              className="!w-[60%]"
            />
            </div>
            <Button type="submit" variant="contained" color="primary" className="!mt-[1em] !w-[60%] !mb-[1em]">
              {loading ? 
                <CircularProgress size={25} style={{color : "white"}}/>

                :
                <div>Validate OTP</div>
              }
            </Button>
        </form>
      </Paper>
    )
  }

  return (
    <Container component="main" maxWidth="xs" >
      <div style={{ margin:"10px 0px" ,display: 'flex', width: '100%' , marginBottom : "10px" }}>
      <Button
        variant={isLogin ? 'contained' : 'outlined'}
        color="primary"
        onClick={() => setIsLogin(true)}
        style={{ flex: 1 , borderRadius:0}}
      >
        Login
      </Button>
      <Button
        variant={!isLogin ? 'contained' : 'outlined'}
        color="primary"
        onClick={() => setIsLogin(false)}
        style={{ flex: 1 , borderRadius:0}}
      >
        Register
      </Button>
    </div>
      <Typography align="center" variant="h5">{isLogin ? 'Login' : 'Register'}</Typography>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Full Name"
              name="name"
              onChange={handleInputChange}
              required
            />
          </>
        )}
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="Email"
          name="email"
          type="email"
          onChange={handleInputChange}
          required
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="Password"
          name="password"
          type="password"
          onChange={handleInputChange}
          required
        />
        
        
        <Button type="submit" fullWidth variant="contained" color="primary" className="!mt-[1em]">
          {
            loading ? 
            <CircularProgress size={25} style={{color : "white"}}/>

            :
            <div>{isLogin ? 'Login' : 'Register'}</div>
          }

        </Button>
        
      </form>
      
    </Container>
  );
};

export default AuthComponent;