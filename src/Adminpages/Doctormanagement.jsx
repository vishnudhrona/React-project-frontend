import React from 'react'
import Adminnav from '../admin/component/Adminnav'
import Doctortable from '../admin/component/Doctortable'

const Doctormanagement = () => {
  return (
    <>
    <Adminnav />
    <div className='px-10'>
    <Doctortable />
    </div>
    </>
  )
}

export default Doctormanagement
