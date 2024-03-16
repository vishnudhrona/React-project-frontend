import React from 'react'
import Doctornav from '../Doctor/component/Doctornav'
import Doctorforgotpasswordconfirm from '../Doctor/component/Doctorforgotpasswordconfirm'
import Doctorfooter from '../Doctor/component/Doctorfooter'

const Doctorforgotpasswordconfirmpage = () => {
  return (
    <>
    <Doctornav />
    <div className='pt-16'>
    <Doctorforgotpasswordconfirm />
    </div>
    <Doctorfooter />
    </>
  )
}

export default Doctorforgotpasswordconfirmpage
