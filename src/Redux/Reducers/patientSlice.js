import { createSlice } from "@reduxjs/toolkit"

const initialState = {accessToken : null, patientId : null, name : null,
    sortedDoc : {
        firstname : null,
        lastname : null,
        department : null,
        number : null,
        degree : null,
        imageurl : null,
        description : null
    },
    timeSlot : null,
    closingSlot : true,
    bookingId : null,
    closingBooking : null
}

const patientSlice = createSlice({
    name : 'patientstoken',
    initialState : initialState,
    reducers : {
        accessToken(state, action ) {
            localStorage.setItem('patientAccessToken', action.payload)
            state.accessToken = action.payload 
        },
    
        patientId(state, action) {
            state.patientId = action.payload
        },
    
        name(state, action) {
            state.name = action.payload
        },

        setSortedDoc(state, action) {
            state.sortedDoc = {
                ...state.sortedDoc,
                ...action.payload
            }
        },

        timeSlot(state, action) {
            state.timeSlot = action.payload
        },

        closingSlot(state, action) {
            state.closingSlot = action.payload
        },

        bookingId(state, action) {
            state.bookingId = action.payload
        },

        closingBooking(state, action) {
            state.closingBooking = action.payload
        }
    }
})

export const { accessToken, patientId, name, setSortedDoc, timeSlot, closingSlot, bookingId, closingBooking } = patientSlice.actions
export default patientSlice.reducer;
