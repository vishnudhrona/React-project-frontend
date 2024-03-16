import React from 'react'
import Adminnav from '../admin/component/Adminnav'
import Paymenttable from '../admin/component/Paymenttable'

const Paymentmanagement = () => {
  return (
    <>
    <Adminnav />
    <div className='px-10 py-5'>
    <Paymenttable />
    </div>
    </>
  )
}

export default Paymentmanagement
