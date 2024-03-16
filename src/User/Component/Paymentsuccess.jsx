import React from 'react'
import { Link } from 'react-router-dom'

const Paymentsuccess = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
  <div className="border border-gray-300 rounded-lg p-6 bg-slate-400">
    <div className="text-center">
      <img
        className="w-40 mb-4 mx-auto"
        src="https://upload.wikimedia.org/wikipedia/commons/3/33/ASTER_DM_HEALTHCARE_LOGO.jpg"
        alt=""
      />
      <h6 className="text-4xl font-bold text-blue-800 mb-2">Thank You!</h6>
      <p className="mb-4">Click here to return to the home page</p>
      <Link to={'/'} className="border p-2 rounded-lg bg-buttonHov text-white font-semibold text-center">
        Home
      </Link>
    </div>
  </div>
</div>
  )
}

export default Paymentsuccess
