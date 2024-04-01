/* eslint-disable no-unused-vars */
import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './components/Home.jsx';
import { Provider } from 'react-redux';
import { store , persistedStore } from './app/store';
import { PersistGate } from 'redux-persist/integration/react';
import Sidebar from './components/Sidebar.jsx';
import './index.css'
import AuthComponent from './components/AuthComponent.jsx';
import Events from './components/Events.jsx';
import AddEvent from './components/AddEvent.jsx';
import TicketInfo from './components/TicketInfo.jsx';
import AdminRequestMail from './components/AdminRequestMail.jsx';
import AdminRequestAcceptance from './components/AdminRequestAcceptance.jsx';
import MyTickets from './components/MyTickets.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Sidebar><Home/></Sidebar>
  },
  {
    path:"/auth" , 
    element : <Sidebar><AuthComponent/></Sidebar>
  },
  {
    path:"/events",
    element:<Sidebar><Events/></Sidebar>
  },
  {
    path:"/addEvent",
    element:<Sidebar><AddEvent/></Sidebar>
  },
  {
    path:"/viewTicketInfo",
    element:<Sidebar><TicketInfo/></Sidebar>
  },
  {
    path:"/adminRequestMail" , 
    element:<Sidebar><AdminRequestMail/></Sidebar>
  },
  {
    path:"/adminRequestAcceptance/:token",
    element:<Sidebar><AdminRequestAcceptance/></Sidebar>
  },
  {
    path:"/myTickets",
    element:<Sidebar><MyTickets/></Sidebar>
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistedStore}>
          <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);