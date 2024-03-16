import React from 'react'
import Navbar from '../User/Component/Navbar'
import Prescriptionview from '../User/Component/Prescriptionview'
import Footer from '../User/Component/Footer'
import Profilesidebar from '../User/Component/Profilesidebar'

const Prescriptionpage = () => {
  return (
    <>
    <Navbar />
    <div className='flex'>
    <Profilesidebar />
    <div className='py-5 pl-40'>
    <Prescriptionview />
    </div>
    </div>
    <Footer />
    </>
  )
}

export default Prescriptionpage
