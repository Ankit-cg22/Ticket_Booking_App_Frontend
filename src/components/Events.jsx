/* eslint-disable no-unused-vars */
import { AppBar, Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Modal, Paper, Toolbar, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EditEventModal from './EditEventModal'
import DeleteEventModal from './DeleteEventModal'
import BookTicketModal from './BookTicketModal'

export default function Events() {
  const [loading, setLoading] = useState(false)
  const [editModalOpen , setEditModalOpen] = useState(false)
  const [deleteModalOpen , setDeleteModalOpen] = useState(false)
  const [bookTicketModalOpen , setBookTicketModalOpen] = useState(false)
   const [eventsList , setEventsList] = useState([])
   const [eventData, setEventData] = useState({
    eventName : "", 
    eventDescription:"" ,
    eventDate :"" ,
    totalTickets:""
  });
  const BASE_BACKEND_URL = import.meta.env.VITE_BASE_BACKEND_URL
  const navigate = useNavigate()
  const user = useSelector(state => {
    return state.authReducers.user
  })
  useEffect(()=>{
    setLoading(true)
    const requestBody = {
      jwtToken : user.jwtToken
    }
    axios.post(`${BASE_BACKEND_URL}/events/getAllFutureEvents` , requestBody)
    .then(res => {
      const eventData = res.data.eventsData
      for(const ev of eventData) {
        ev['eventDate'] = ev['eventDate'].split('T')[0]
      }
      setEventsList(eventData)
    })
    .catch(err=>{
      // console.log(err)
      const errorMessage = err.response.data.msg
      alert(errorMessage)
    })
    .finally(()=>{
      setLoading(false)
    })
  } , [])

  const editEvent = (event) => {
    setEventData(event)
    setEditModalOpen(true)
  }
  const deleteEvent = (event) =>{
    setEventData(event)
    setDeleteModalOpen(true)
  }
  const handleBookTicketClick = (event) => {
    setEventData(event)
    setBookTicketModalOpen(true)
  }
  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    p: 4,
    border:"none !important",
    outline:"none !important" , 
    borderRadius : "0.4em"
};


  return (
    <div>
      <div className='!mb-[2em]'>
        Events
      </div>
      <div>
        <Grid container spacing={2}>
        {
          loading ? <Typography className='!ml-[1em] '>Loading events ...</Typography>
          :

          eventsList.length?
          (
            eventsList.map((event , index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardActionArea>
                    {/* <CardMedia
                      component="img"
                      height="140"
                      image="/static/images/cards/contemplative-reptile.jpg"
                      alt="green iguana"
                    /> */}
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {event.eventName} {event.eventDate.substring(0 , 10)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {event.eventDescription}
                        </Typography>
                        <Typography>
                          {event.ticketsBooked}/{event.totalTickets} booked 
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions className='relative !mb-[1em]'>
                      {user.isAdmin &&
                        <div className='flex justify-between items-center ml-[0.2em]'>
                          <EditIcon className="!text-[1.2em] mr-[0.8em] cursor-pointer" color="primary" onClick={()=>editEvent(event)}/>
                          <DeleteIcon className="!text-[1.2em] cursor-pointer " color="primary" onClick={()=>deleteEvent(event)}/>
                        </div>
                      }
                      <Button className='!absolute right-[10px]' size="small" variant="outlined" color="primary" onClick={() => handleBookTicketClick(event)}>
                        Book Ticket
                      </Button>
                    </CardActions>
              </Card>
              </Grid>
            ))
          )
        :
          <Typography className='!ml-[1em]'>No future events available.</Typography>
        }
      </Grid>
      </div>
      <EditEventModal editModalOpen={editModalOpen} setEditModalOpen={setEditModalOpen} formData={eventData} setFormData={setEventData} eventsList={eventsList} setEventsList={setEventsList} modalStyle={modalStyle}/>
      <DeleteEventModal deleteModalOpen={deleteModalOpen} setDeleteModalOpen={setDeleteModalOpen} modalStyle={modalStyle} eventData={eventData} eventsList={eventsList} setEventsList={setEventsList}/>
      <BookTicketModal bookTicketModalOpen={bookTicketModalOpen} setBookTicketModalOpen={setBookTicketModalOpen} user={user} modalStyle={modalStyle} eventData={eventData} />
    </div>
  )
}
