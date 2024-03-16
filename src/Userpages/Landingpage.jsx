import React from 'react'
import Navbar from '../User/Component/Navbar'
import Banner from '../User/Component/Banner'
import Specialities from '../User/Component/Specialities'
import Doctors from '../User/Component/Doctors'
import Footer from '../User/Component/Footer'

const Landingpage = () => {
  return (
    <div>
      <Navbar />
      <Banner />
      <Specialities />
      <Doctors />
      <Footer />
    </div>
  )
}

export default Landingpage
