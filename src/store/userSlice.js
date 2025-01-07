import { createSlice } from "@reduxjs/toolkit";
const user = createSlice({
    name : "user",
    initialState : null,
    reducers:{
        adduser : (state, payload)=>{
            return payload
        },
        removeUser : (state, payload) =>{
            return null
        }
    }
})

export const {adduser, removeUser} = user.actions
export default user.reducer