/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user : {}
}

export const authSlice = createSlice({
    name : 'auth' ,
    initialState ,
    reducers : {
        addUser : (state , action) => {
            state.user = action.payload.user
        },

        removeUser : (state , action) => {
            state.user = {}
        }
    }
})



export const {addUser , removeUser} = authSlice.actions;

export default authSlice.reducer;