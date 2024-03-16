import React from 'react'
import Doctornav from '../Doctor/component/Doctornav'
import Prescription from '../Doctor/component/Prescription'
import Doctorfooter from '../Doctor/component/Doctorfooter'

const Prescriptionpage = () => {
  return (
    <>
    <Doctornav />
    <div className='pt-10'>
    <Prescription />
    </div>
    <Doctorfooter />
    </>
  )
}

export default Prescriptionpage
