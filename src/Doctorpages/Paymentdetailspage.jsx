import React from 'react'
import Doctornav from '../Doctor/component/Doctornav'
import Paymentdetails from '../Doctor/component/Paymentdetails'
import Doctorfooter from '../Doctor/component/Doctorfooter'

const Paymentdetailspage = () => {
  return (
    <>
    <Doctornav />
    <div className='py-20 px-10'>
    <Paymentdetails />
    </div>
    <Doctorfooter />
    </>
  )
}

export default Paymentdetailspage
