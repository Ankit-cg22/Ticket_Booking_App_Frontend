import StadiumIcon from '@mui/icons-material/Stadium';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import AddBoxIcon from '@mui/icons-material/AddBox';
import FeedIcon from '@mui/icons-material/Feed';

export const UserNavbarOptions = [
    {text : "Events" , link:"/events" , icon:StadiumIcon } ,
    {text : "My Tickets" , link:"/myTickets" , icon:ConfirmationNumberIcon} 
]

export const AdminNavbarOptions = [
    {text: "Add Event" , link:"/addEvent" , icon : AddBoxIcon} ,
    {text: "View Ticket Info" , link : "/viewTicketInfo" , icon : FeedIcon}
]

