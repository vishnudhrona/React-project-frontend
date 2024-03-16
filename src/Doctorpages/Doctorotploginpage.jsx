import React from 'react'
import Doctornav from '../Doctor/component/Doctornav'
import Doctorotplogin from '../Doctor/component/Doctorotplogin'
import Doctorfooter from '../Doctor/component/Doctorfooter'

const Doctorotploginpage = () => {
  return (
    <>
    <Doctornav />
    <div className='pt-16'>
    <Doctorotplogin />
    </div>
    <Doctorfooter />
    </>
  )
}

export default Doctorotploginpage
