import React from 'react'
import { Link } from 'react-router-dom'
import { FaUser, FaPrescription, FaHistory } from 'react-icons/fa';

const Profilesidebar = () => {
  return (
    <div className='bg-white px-5 py-5 h-screen'>
        <ul>
            <li className='text-xs text-black mb-5'>
                <Link to="/userprofile" className="flex items-center">
                    <FaUser className="mr-2" />
                    User Profile
                </Link>
            </li>
            <li className='text-xs text-black mb-5'>
                <Link to="/prescriptionview" className="flex items-center">
                    <FaPrescription className="mr-2" />
                    Prescription
                </Link>
            </li>
            {/* <li className='text-xs text-black'>
                <Link to="/appointment-history" className="flex items-center">
                    <FaHistory className="mr-2" />
                    Appointment History
                </Link>
            </li> */}
        </ul>
    </div>
  )
}

export default Profilesidebar
