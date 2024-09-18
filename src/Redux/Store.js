import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import patientSlice from './Reducers/patientSlice'
import doctorSlice from "./Reducers/doctorSlice";
import adminSlice from "./Reducers/adminSlice";

const store = configureStore({
    reducer : {
        patientData : patientSlice,
        doctorData : doctorSlice,
        adminData : adminSlice
    }
})

export const persistor = persistStore(store)
export default store