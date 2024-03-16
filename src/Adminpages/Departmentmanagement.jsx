import React from 'react'
import Adminnav from '../admin/component/Adminnav'
import Departmenttable from '../admin/component/Departmenttable'

const Departmentmanagement = () => {
  return (
    <>
    <Adminnav />
    <div className='px-10'>
    <Departmenttable />
    </div>
    </>
  )
}

export default Departmentmanagement
