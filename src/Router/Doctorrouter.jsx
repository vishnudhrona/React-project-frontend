import React, { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import Doctorloginpage from '../Doctorpages/Doctorloginpage'
import Doctorsignuppage from '../Doctorpages/Doctorsignuppage'
import Doctorotploginpage from '../Doctorpages/Doctorotploginpage'
import Doctoraddprofilepage from '../Doctorpages/Doctoraddprofilepage'
import Doctorforgotpasswordpage from '../Doctorpages/Doctorforgotpasswordpage'
import Doctorforgotpasswordconfirmpage from '../Doctorpages/Doctorforgotpasswordconfirmpage'
import Doctortimeschedulepage from '../Doctorpages/Doctortimeschedulepage'
import Doctorprofilepage from '../Doctorpages/Doctorprofilepage'
import Bookingdetailspage from '../Doctorpages/Bookingdetailspage'
import Videocall from '../Doctor/component/Videocall'
import Remoteuservideocall from '../Doctor/component/Remoteuservideocall'
import Paymentdetailspage from '../Doctorpages/Paymentdetailspage'
import Prescriptionpage from '../Doctorpages/Prescriptionpage'

const LazyBookingDetails = lazy(() => import('../Doctorpages/Bookingdetailspage'))


const Doctorrouter = () => {
  return (
    <Routes>
        <Route path='/doctorsignup' element = {<Doctorsignuppage />} />
        <Route path='/docotpverification/:number' element = {<Doctorotploginpage />} />
        <Route path='/doctoraddprofile' element = {<Doctoraddprofilepage />} />
        <Route path='/doctorlogin' element = {<Doctorloginpage />} />
        <Route path='/doctorforgotpassword' element = {<Doctorforgotpasswordpage />} />
        <Route path='/doctorforgotpasswordconfirm/:doctorEmail' element = {<Doctorforgotpasswordconfirmpage />} />
        <Route path='/scheduletime' element = {<Doctortimeschedulepage />} />
        <Route path='/doctorprofile' element = {<Doctorprofilepage />} />
        <Route path='/patientbookingdetails' element = {<Suspense fallback={<div>Loading...</div>}><LazyBookingDetails /></Suspense>} />
        <Route path='/videocall' element = {<Videocall />} />
        <Route path='/remoteuservideo' element = {<Remoteuservideocall />} />
        <Route path='/paymentdetails' element = {<Paymentdetailspage />} />
        <Route path='/prescription' element = {<Prescriptionpage />} />
    </Routes>
  )
}

export default Doctorrouter
