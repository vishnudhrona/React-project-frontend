import 'flowbite'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FcCalendar } from "react-icons/fc"
import { RiLoginBoxLine } from "react-icons/ri"
import { jwtDecode } from "jwt-decode";
import Dropdownmenu from './Dropdownmenu';
import { FaUser } from "react-icons/fa";


const Navbar = () => {
    const [loggedIn, setLoggedIn] = useState('')
    const [showDropdown, setShowDropdown] = useState(false)


    const accessToken = localStorage.getItem('token')

    useEffect(() => {
        if (accessToken) {
            try {
                const decode = jwtDecode(accessToken)
                setLoggedIn(decode || '')
            } catch (err) {
                localStorage.removeItem('token');
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
                    >
                        <ul
                            className="flex flex-col font-medium p-4 md:p-0 mt-4 rounded-lg bg-gray-50 md:flex-row md:space-x-0 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
                            style={{ backgroundColor: "#2b7786" }}
                        >
                            <li>
                                <Link
                                    to={"/bookappointment"}
                                    className="hover:bg-buttonHov w-auto h-16 flex flex-col py-2 px-4 text-white border-r border-gray-500"
                                >
                                    <div className="flex items-center">
                                        <FcCalendar />
                                        <div className="flex flex-col items-start text-lg px-3 pt-1">
                                            <span>Book An</span>
                                            <span>Appointment</span>
                                        </div>
                                    </div>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to={"/userprofile"}
                                    className="hover:bg-buttonHov w-auto h-16 flex flex-col py-2 px-4 text-white border-r border-gray-500"
                                >
                                    <div className="flex items-center">
                                        <FaUser />
                                        <div className="flex flex-col items-start text-lg px-3 pt-1">
                                            <span>Your</span>
                                            <span>Profile</span>
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

                                        {loggedIn ? `Hello ${loggedIn.user}!` : 'Login'}

                                        <div className='absolute'>
                                            {showDropdown && (
                                                <Dropdownmenu />
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

export default Navbar
