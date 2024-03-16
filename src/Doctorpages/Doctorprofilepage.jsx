import React from 'react'
import Doctornav from '../Doctor/component/Doctornav'
import Doctorprofile from '../Doctor/component/Doctorprofile'
import Doctorfooter from '../Doctor/component/Doctorfooter'

const Doctorprofilepage = () => {
  return (
    <>
    <Doctornav />
    <div className="pt-24 pl-32">
    <Doctorprofile />
    </div>
    <Doctorfooter />
    </>
  )
}

export default Doctorprofilepage
