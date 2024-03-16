import React from 'react'
import { Link } from 'react-router-dom'

const Dropdownmenu = () => {

    const logOut = () => {
        const accessToken = localStorage.getItem('token')
        if(accessToken) {
            localStorage.removeItem('token');
        } else {
            console.log('No token found');
        }
    }

  return (
    <div className="grid pt-12 justify-items-center">
      <ul className="absolute mt-2 space-y-2 text-lg text-white bg-megamenuColor px-11 py-3 shadow-md z-50">
        {/* <li>
          <a href="#">Profile</a>
        </li> */}
        <li>
          <Link onClick={logOut} to={'/login'}>LogOut</Link>
        </li>
      </ul>
    </div>
  )
}

export default Dropdownmenu
