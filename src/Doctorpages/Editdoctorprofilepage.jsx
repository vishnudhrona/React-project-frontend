import React from 'react'
import Editdoctorprofile from '../Doctor/component/Editdoctorprofile'
import Doctornav from '../Doctor/component/Doctornav'
import Doctorfooter from '../Doctor/component/Doctorfooter'

const Editdoctorprofilepage = () => {
  return (
    <div>
      <Doctornav />
      <div className='pt-16'>
      <Editdoctorprofile />
      </div>
      <Doctorfooter />
    </div>
  )
}

export default Editdoctorprofilepage
