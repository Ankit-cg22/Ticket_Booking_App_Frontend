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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Sidebar><Home/></Sidebar>
  },
  {
    path:"/auth" , 
    element : <Sidebar><AuthComponent/></Sidebar>
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