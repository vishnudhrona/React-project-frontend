import React from 'react'
import { Link } from 'react-router-dom';

const Logout = () => {

    const logOut = () => {
        const accessToken = localStorage.getItem('adminToken')
        if(accessToken) {
            localStorage.removeItem('adminToken');
        } else {
            console.log('No token found');
        }
    }


  return (
    <div className="grid pt-12 justify-items-center">
      <ul className="absolute mt-2 space-y-2 text-lg text-white bg-megamenuColor px-11 py-3 shadow-md z-50">
        <li>
          <Link onClick={logOut} to={'/admin/adminlogin'}>LogOut</Link>
        </li>
      </ul>
    </div>
  )
}

export default Logout
