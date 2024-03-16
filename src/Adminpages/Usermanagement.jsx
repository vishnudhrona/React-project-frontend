import React from 'react'
import Adminnav from '../admin/component/Adminnav'
import Usertable from '../admin/component/Usertable'

const Usermanagement = () => {
  return (
    <>
    <Adminnav />
    <div className='px-10'>
    <Usertable />
    </div>
    </>
  )
}

export default Usermanagement
