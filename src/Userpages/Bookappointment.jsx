import React from 'react'
import Navbar from '../User/Component/Navbar'
import Doctordetails from '../User/Component/Doctordetails'
import Sidebar from '../User/Component/Sidebar'
import Footer from '../User/Component/Footer'

const Bookappointment = () => {
  return (
      <>
          <Navbar />
          <div className='flex'>
              <Sidebar />
              <Doctordetails />
          </div>
          <Footer />
      </>
  )
}

export default Bookappointment
