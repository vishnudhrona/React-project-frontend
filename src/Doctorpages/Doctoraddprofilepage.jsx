import React from 'react'
import Doctornav from '../Doctor/component/Doctornav'
import Doctoraddprofile from '../Doctor/component/Doctoraddprofile'
import Doctorfooter from '../Doctor/component/Doctorfooter'

const Doctoraddprofilepage = () => {
  return (
    <>
    <Doctornav />
    <div className='pt-16'>
    <Doctoraddprofile />
    </div>
    <Doctorfooter />
    </>
  )
}

export default Doctoraddprofilepage
