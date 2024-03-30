import { configureStore } from "@reduxjs/toolkit";
import authReducers from '../features/auth/authSlice'
import {persistReducer , persistStore} from 'redux-persist'
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key : 'ticketBookingAppStorage' ,
    storage 
}

const persistAuthReducer = persistReducer(persistConfig , authReducers)
export const store = configureStore({
    reducer:{
        authReducers : persistAuthReducer
    },
});

export const persistedStore = persistStore(store)