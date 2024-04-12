import { createSlice } from "@reduxjs/toolkit";

const initialState = { doctorId : null, scheduleClose : null, scheduleId : null, scheduleDeleteConfirm : null, scheduleError : null }

const doctorSlice = createSlice({
    name : 'doctorId',
    initialState : initialState,
    reducers : {
        doctorId(state, action){
            state.doctorId = action.payload
        },

        scheduleClose(state, action){
            state.scheduleClose = action.payload
        },

        scheduleId(state, action){
            state.scheduleId = action.payload
        },

        scheduleDeleteConfirm(state, action){
            state.scheduleDeleteConfirm = action.payload
        },

        scheduleError(state, action){
            state.scheduleError = action.payload
        }
    }
})

export const { doctorId, scheduleClose, scheduleId, scheduleDeleteConfirm, scheduleError } = doctorSlice.actions
export default doctorSlice.reducer