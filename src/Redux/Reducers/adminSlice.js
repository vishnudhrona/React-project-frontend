import { createSlice } from "@reduxjs/toolkit";

const initialState = { deparmentFormClose : null, departmentId : null, departmentConfirmDelete : null, departmentEditForm : null }

const adminSlice = createSlice({
    name: 'adminId',
    initialState :initialState,
    reducers : {
        deparmentFormClose(state, action){
            state.deparmentFormClose = action.payload
        },

        departmentId(state, action){
            state.departmentId = action.payload
        },

        departmentConfirmDelete(state, action){
            state.departmentConfirmDelete = action.payload
        },

        departmentEditForm(state, action){
            state.departmentEditForm = action.payload
        }
    }
})

export const { deparmentFormClose, departmentId, departmentConfirmDelete, departmentEditForm } = adminSlice.actions
export default adminSlice.reducer