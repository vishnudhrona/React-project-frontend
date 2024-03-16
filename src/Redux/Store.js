import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import patientSlice from './Reducers/patientSlice'
import doctorSlice from "./Reducers/doctorSlice";
import adminSlice from "./Reducers/adminSlice";
// import doctorSlice from './Reducers/doctorSlice'

// const doctorPersistConfig = {
//     key : 'doctorData',
//     storage
// }

// const persistDoctorReducer = persistReducer(doctorPersistConfig, doctorSlice,
//     {
//         serialize : (data) => {
//             return JSON.stringify(data)
//         }
//     })

const store = configureStore({
    reducer : {
        patientData : patientSlice,
        doctorData : doctorSlice,
        adminData : adminSlice
    }
})

export const persistor = persistStore(store)
export default store