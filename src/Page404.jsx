import React from 'react'
import { useNavigate } from 'react-router-dom'

const Page404 = () => {
    const navigate = useNavigate()
    const login = () => {
        navigate('/login')
    }
  return (
    <div>
      <button className='bg-blue-500 rounded px-5 py-5 font-bold text-white' onClick={login}>Login</button>
    </div>
  )
}

export default Page404
