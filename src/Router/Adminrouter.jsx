import React from 'react'
import { Route, Routes } from "react-router-dom"
import Adminlogin from '../admin/component/Adminlogin'
import Doctormanagement from '../Adminpages/Doctormanagement'
import Departmentmanagement from '../Adminpages/Departmentmanagement'
import Usermanagement from '../Adminpages/Usermanagement'
import Paymentmanagement from '../Adminpages/Paymentmanagement'
import Adminhomepage from '../Adminpages/Adminhomepage'
import Page404 from '../Page404'


const Adminrouter = () => {
  return (
    <>
    <Routes>
        <Route path='/adminlogin' element = {<Adminlogin />} />
        <Route path='/doctormanagement' element = {<Doctormanagement />} />
        <Route path='/departmentmanagement' element = {<Departmentmanagement />} />
        <Route path='/usermanagement' element = {<Usermanagement />} />
        <Route path='/paymentmanagement' element = {<Paymentmanagement />} />
        <Route path='/adminhome' element = {<Adminhomepage />} />
        <Route path='*' element = {<Page404 />} />
    </Routes>
    </>
  )
}

export default Adminrouter
