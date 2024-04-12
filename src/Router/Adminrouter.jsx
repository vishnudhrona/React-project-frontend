import React from 'react'
import { Route, Routes } from "react-router-dom"
import Adminlogin from '../admin/component/Adminlogin'
import Doctormanagement from '../Adminpages/Doctormanagement'
import Departmentmanagement from '../Adminpages/Departmentmanagement'
import Usermanagement from '../Adminpages/Usermanagement'
import Paymentmanagement from '../Adminpages/Paymentmanagement'
import Adminhome from '../admin/component/Adminhome'


const Adminrouter = () => {
  return (
    <>
    <Routes>
        <Route path='/adminlogin' element = {<Adminlogin />} />
        <Route path='/doctormanagement' element = {<Doctormanagement />} />
        <Route path='/departmentmanagement' element = {<Departmentmanagement />} />
        <Route path='/usermanagement' element = {<Usermanagement />} />
        <Route path='/paymentmanagement' element = {<Paymentmanagement />} />
        <Route path='/adminhome' element = {<Adminhome />} />
    </Routes>
    </>
  )
}

export default Adminrouter
