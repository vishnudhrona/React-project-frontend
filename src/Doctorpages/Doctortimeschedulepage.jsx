import React from 'react'
import Doctornav from '../Doctor/component/Doctornav'
import Doctortimescheduletable from '../Doctor/component/Doctortimescheduletable'
import Doctorfooter from '../Doctor/component/Doctorfooter'

const Doctortimeschedulepage = () => {
  return (
    <>
    <Doctornav />
    <div className='py-20 px-10'>
    <Doctortimescheduletable />
    </div>
    <Doctorfooter />
    </>
  )
}

export default Doctortimeschedulepage
