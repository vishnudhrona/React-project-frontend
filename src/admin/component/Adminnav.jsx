import React, { useEffect, useState } from 'react'
import { AiFillCaretDown } from 'react-icons/ai'
import { FaHospital } from 'react-icons/fa'
import { ImUserTie } from 'react-icons/im'
import { PiStethoscope } from 'react-icons/pi'
import { RiLoginBoxLine } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import { jwtDecode } from "jwt-decode";
import Logout from './Logout'
import { MdPayments } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";


const Adminnav = () => {
    const [loggedIn, setLoggedIn] = useState('')
    const [showDropdown, setShowDropdown] = useState(false)

    console.log(loggedIn,'jjjjjjjjjjjjjjjjjjjjjtttttttt');

    const accessToken = localStorage.getItem('adminToken')

    useEffect(() => {
        if(accessToken) {
          try {
          const decode = jwtDecode(accessToken)
          console.log(decode,'decode admin token');
          setLoggedIn(decode?.adminName || '')
          } catch(err) {
            console.log(err,'jkooooooooooooooo');
            localStorage.removeItem('adminToken');
          }
        } else {
          console.log('user not loggedIn');
        }
      }, [accessToken])

  return (
    <div className='absolute sticky top-0 z-50'>
    <nav className="bg-customColor border-gray-200 dark:bg-gray-900 dark:border-gray-700">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto">
            <a href="/" className="flex items-center">
                <img
                    src="https://www.asterhospitals.in/themes/custom/aster/aster-logo.svg"
                    className="h-8 pl-16"
                    alt="Aster Logo"
                />
            </a>
            <div
                className="hidden w-full md:block md:w-auto"
                id="navbar-multi-level"
            //  onMouseEnter={handleMouseEnter}
            >
                <ul
                    className="flex flex-col font-medium p-4 md:p-0 mt-4 rounded-lg bg-gray-50 md:flex-row md:space-x-0 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
                    style={{ backgroundColor: "#2b7786" }}
                >
                    <li>
                        <Link
                            to={"/admin/departmentmanagement"}
                            className="hover:bg-buttonHov w-auto h-16 flex flex-col py-2 px-4 text-white border-r border-gray-500"
                        >
                            <div className="flex items-center">
                            <FaHospital />
                                <div className="flex flex-col items-start text-lg px-3 pt-1">
                                    <span>Department</span>
                                    <span>Management</span>
                                </div>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to={"/admin/doctormanagement"}
                            className="hover:bg-buttonHov w-auto h-16 flex flex-col py-2 px-4 text-white border-r border-gray-500"
                        >
                            <div className="flex items-center">
                                <ImUserTie />
                                <div className="flex flex-col items-start text-lg px-3 pt-1">
                                    <span>Doctor</span>
                                    <span>Management</span>
                                </div>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to={"/admin/usermanagement"}
                            className="hover:bg-buttonHov w-auto h-16 flex flex-col py-2 px-4 text-white border-r border-gray-500"
                        >
                            <div className="flex items-center">
                            <FaUserAlt />
                                <div className="flex flex-col items-start text-lg px-3 pt-1">
                                    <span>User</span>
                                    <span>Management</span>
                                </div>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to={"/admin/paymentmanagement"}
                            className="hover:bg-buttonHov w-auto h-16 flex flex-col py-2 px-4 text-white border-r border-gray-500"
                        >
                            <div className="flex items-center">
                            <MdPayments />
                                <div className="flex flex-col items-start text-lg px-3 pt-1">
                                    <span>Payment</span>
                                    <span>Management</span>
                                </div>
                            </div>
                        </Link>
                    </li>
                    <li>
                         {loggedIn ? ( 
                         <Link
                                className="text-white p-6 flex items-center gap-2 text-lg "
                                onClick={() => setShowDropdown(!showDropdown)}
                            >

                                {loggedIn ? `Hello ${loggedIn}!` : 'Login'}

                                <div className='absolute'>
                                    {showDropdown && (
                                        <Logout />
                                    )}
                                </div>
                                <RiLoginBoxLine />
                            </Link> 
                      ) : ( 
                        <Link
                            to={"/login"}
                            className="text-white p-6 flex items-center gap-2 text-lg"
                        >
                            Login
                            <RiLoginBoxLine />
                        </Link>
                     )} 
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</div>
  )
}

export default Adminnav
