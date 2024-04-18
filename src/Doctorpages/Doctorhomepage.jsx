import React from 'react'
import Doctornav from '../Doctor/component/Doctornav'
import Doctorhome from '../Doctor/component/Doctorhome'
import Doctorfooter from '../Doctor/component/Doctorfooter'

const Doctorhomepage = () => {
  return (
    <>
    <Doctornav />
    <div className='pt-16'>
    <Doctorhome />
    </div>
    <Doctorfooter />
    </>
  )
}

export default Doctorhomepage
