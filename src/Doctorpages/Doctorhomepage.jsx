import React from 'react'
import Doctornav from '../Doctor/component/Doctornav'
import Doctorhome from '../Doctor/component/Doctorhome'

const Doctorhomepage = () => {
  return (
    <>
    <Doctornav />
    <div className='pt-16'>
    <Doctorhome />
    </div>
    </>
  )
}

export default Doctorhomepage
