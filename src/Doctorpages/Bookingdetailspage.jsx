import React from 'react'
import Doctornav from '../Doctor/component/Doctornav'
import Doctorfooter from '../Doctor/component/Doctorfooter'
import Doctorbookingstable from '../Doctor/component/Doctorbookingstable'

const Bookingdetailspage = () => {
  return (
    <>
    <Doctornav />
    <div className='py-20 px-10'>
    <Doctorbookingstable />
    </div>
    <Doctorfooter />
    </>
  )
}

export default Bookingdetailspage
