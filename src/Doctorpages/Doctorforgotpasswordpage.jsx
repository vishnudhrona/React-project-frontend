import React from 'react'
import Doctornav from '../Doctor/component/Doctornav'
import Doctorfooter from '../Doctor/component/Doctorfooter'
import Doctorforgotpasswordconfirm from '../Doctor/component/Doctorforgotpasswordconfirm'
import Doctorforgotpassword from '../Doctor/component/Doctorforgotpassword'

const Doctorforgotpasswordpage = () => {
  return (
    <>
    <Doctornav />
    <div className='pt-16'>
        <Doctorforgotpassword />
    </div>
    <Doctorfooter />
    </>
  )
}

export default Doctorforgotpasswordpage
