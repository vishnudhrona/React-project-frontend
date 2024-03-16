import React from 'react'
import Doctornav from '../Doctor/component/Doctornav'
import Doctorsignup from '../Doctor/component/Doctorsignup'
import Doctorfooter from '../Doctor/component/Doctorfooter'

const Doctorsignuppage = () => {
  return (
    <div>
      <Doctornav />
      <div className='pt-16'>
      <Doctorsignup />
      </div>
      <Doctorfooter />
    </div>
  )
}

export default Doctorsignuppage
