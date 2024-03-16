import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Landingpage from '../Userpages/Landingpage'
import Login from '../Userpages/Login'
import Signup from '../Userpages/Signup'
import Otpverification from '../Userpages/Otpverification'
import Forgotpasswordnumber from '../Userpages/Forgotpasswordnumber'
import Forgotpasswordconfirmation from '../Userpages/Forgotpasswordconfirmation'
import Bookappointment from '../Userpages/Bookappointment'
import Slotbookingpage from '../Userpages/Slotbookingpage'
import Paymentpage from '../Userpages/Paymentpage'
import Paymentsuccess from '../User/Component/Paymentsuccess'
import Userprofilepage from '../Userpages/Userprofilepage'
import Edituserprofilepage from '../Userpages/Edituserprofilepage'
import Prescriptionpage from '../Userpages/Prescriptionpage'

const Patientrouter = () => {
  return (
    <Routes>
        <Route path='/' element = {<Landingpage />} />
        <Route path='/signup' element = {<Signup />} />
        <Route path='/login' element = {<Login />} />
        <Route path='/otpverification/:number' element = {<Otpverification />} />
        <Route path='/userforgotpassword' element = {<Forgotpasswordnumber />} />
        <Route path='/userforgotpasswordconfirm/:userEmail' element = {<Forgotpasswordconfirmation />} />
        <Route path='/bookappointment' element = {<Bookappointment />} />
        <Route path='/timeslot/:doctorId' element = {<Slotbookingpage />} />
        <Route path='/paymentinfo' element = {<Paymentpage />} />
        <Route path='/paymentsuccess' element = {<Paymentsuccess />} />
        <Route path='/userprofile' element = {<Userprofilepage />} />
        <Route path='/edituserprofile/:patientId' element = {<Edituserprofilepage />} />
        <Route path='/prescriptionview' element = {<Prescriptionpage />} />
    </Routes>
  )
}

export default Patientrouter
