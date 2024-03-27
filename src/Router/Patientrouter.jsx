import React, { lazy, Suspense } from 'react';
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
// import Prescriptionpage from '../Userpages/Prescriptionpage'

const LazyPrescriptionpage = lazy(() => import('../Userpages/Prescriptionpage'));


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
        <Route
  path='/prescriptionview'
  element={
    <Suspense
      fallback={
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh'
        }}>
          <img src='https://media.architecturaldigest.com/photos/63079fc7b4858efb76814bd2/16:9/w_4000,h_2250,c_limit/9.%20DeLorean-Alpha-5%20%5BDeLorean%5D.jpg' alt='Loading...' />
        </div>
      }
    >
      <LazyPrescriptionpage />
    </Suspense>
  }
/> 
    </Routes>
  )
}

export default Patientrouter
