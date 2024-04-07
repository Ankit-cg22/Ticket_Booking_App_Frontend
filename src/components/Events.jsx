/* eslint-disable no-unused-vars */
import { AppBar, Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, LinearProgress, Modal, Paper, Toolbar, Tooltip, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EditEventModal from './EditEventModal'
import DeleteEventModal from './DeleteEventModal'
import BookTicketModal from './BookTicketModal'
import { BASE_BACKEND_URL, getAxiosConfig } from '../utils/requestUtils'

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
  const navigate = useNavigate()
  const user = useSelector(state => {
    return state.authReducers.user
  })
  useEffect(()=>{
    setLoading(true)
    axios.get(`${BASE_BACKEND_URL}/events/getAllFutureEvents` , getAxiosConfig(user.jwtToken))
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
              <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      className='!h-[180px]'
                      image="/static/images/events.jpg"
                      alt="events_image"
                    />
                    <CardContent>
                        <Typography gutterBottom component="div">
                          <div className='flex justify-between items-center'>
                            <Typography variant="body1">{event.eventName}</Typography>
                            <Typography className='bg-cyan-200 rounded-md !p-[0.2em] !text-[0.8em]'>{event.eventDate.substring(0 , 10)}</Typography>
                          </div>
                        </Typography>
                        <Typography variant="body2" color="text.secondary" className='!my-[1em]'>
                          {event.eventDescription}
                        </Typography>
                        <Typography>
                          
                          <Tooltip title={`${event.ticketsBooked}/${event.totalTickets} tickets booked `}>
                            <LinearProgress className='!p-[0.2em] rounded-[0.3em]' variant="determinate" value={((event.ticketsBooked)/(event.totalTickets))*100} />
                          </Tooltip>
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
