import React, { useEffect, useState } from 'react'
import instance from '../../Axios/Axios'
import { TbPlayerTrackNextFilled, TbPlayerTrackPrevFilled } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'

const Usertable = () => {
    const [users, setUsers] = useState([])
    const [blockedStatus, setBlockedStatus] = useState({})
    const [currentPage, setCurrentPage] = useState(1);
    const [doctorsPerPage] = useState(5);
    const [searchInput, setSearchInput] = useState("");
    const [filteredDoctorProfile, setFilteredDoctorProfile] = useState([]);

    const navigate = useNavigate()

    useEffect(() => {
        instance.get('/admin/usermanagement').then((users) => {
            setUsers(users.data.users)
        })
    }, [blockedStatus])

    useEffect(() => {
        let accessToken = localStorage.getItem('adminToken')
        if(!accessToken) {
          navigate('/admin/adminlogin')
        }
      }, [])

    const indexOfLastDoctor = currentPage * doctorsPerPage;
    const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
    const currentDoctors = users.slice(indexOfFirstDoctor, indexOfLastDoctor);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const block = (userId) => {
        instance.get(`/admin/userblock?userId=${userId}`).then((status) => {
            setBlockedStatus((prevStatus) => ({
                ...prevStatus,
                [userId]: status.data.status
            }))

            setUsers(prevUser => prevUser.map(user => 
                user._id ===userId ? { ...user, signupStatus : status.data.status} : user
                ))

                if(searchInput) {
                    setFilteredDoctorProfile(prevFilteredUser => 
                        prevFilteredUser.map(user => 
                            user._id ===  userId ? {...user, signupStatus : status.data.status} : user
                            ))
                }
        })
    }

    const unblock = (userId) => {
        instance.get(`/admin/userunblock?userId=${userId}`).then((status) => {
            setBlockedStatus((prevStatus) => ({
                ...prevStatus,
                [userId]: status.data.status
            }))

            setUsers(prevUser => prevUser.map(user => 
                user._id ===userId ? { ...user, signupStatus : status.data.status} : user
                ))

                if(searchInput) {
                    setFilteredDoctorProfile(prevFilteredUser => 
                        prevFilteredUser.map(user => 
                            user._id ===  userId ? {...user, signupStatus : status.data.status} : user
                            ))
                }
        })
    }

    const searchDoctors = () => {
        const query = searchInput.toLowerCase();
        const filteredProfiles = users.filter((doc) => {
            const fullName = `${doc.patientfirstname} ${doc.lastName}`.toLowerCase();
            return fullName.includes(query);
        });
        setFilteredDoctorProfile(filteredProfiles);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        searchDoctors();
    };

    const searchDoc = (e) => {
        setSearchInput(e.target.value);
    };

    return (
        <>
            <div className="py-5">
                <form className="flex items-center"
                    onSubmit={handleSubmit}
                >
                    <label htmlFor="voice-search" className="sr-only">
                        Search
                    </label>
                    <div className="relative w-full">
                        <input
                            type="text"
                            id="voice-search"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Search Doctors"
                            required=""
                            onChange={searchDoc}
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 flex items-center pr-3"
                        >
                        </button>
                    </div>
                    <button
                        type="submit"
                        className="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-customColor rounded-lg border border-customColor hover:bg-buttonHov focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        <svg
                            className="w-4 h-4 mr-2"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                            />
                        </svg>
                        Search
                    </button>
                </form>
            </div>
            <div className="flex items-center justify-center border border-gray-300">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                No.
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Patient Firstname
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Last name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Number
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredDoctorProfile.length > 0 && searchInput ? (
                            <>
                                {filteredDoctorProfile.map((user, index) => (
                                    <tr
                                        className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                                        key={user._id}
                                    >
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                        >
                                            {index + 1}
                                        </th>
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                        >
                                            {user.patientfirstname}
                                        </th>
                                        <td className="px-6 py-4">{user.lastName}</td>
                                        <td className="px-6 py-4">{user.number}</td>
                                        <td className="px-6 py-4">{user.email}</td>
                                        <td className='px-6 py-4 text-blue-700 font-bold'>
                                            {user.signupStatus}
                                        </td>
                                        <td className="px-6 py-4">
                                            {user.signupStatus == 'unblock' ? (
                                                <button
                                                    className="font-medium text-red-600 dark:text-blue-500 hover:underline"
                                                    onClick={() => block(user._id)}
                                                >
                                                    Block
                                                </button>
                                            ) : (
                                                <button
                                                    className="font-medium text-green-400 dark:text-blue-500 hover:underline"
                                                    onClick={() => unblock(user._id)}
                                                >
                                                    Unblock
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </>
                        ) : (
                            <>
                                {currentDoctors.map((user, index) => (
                                    <tr
                                        className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                                        key={user._id}
                                    >
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                        >
                                            {index + 1}
                                        </th>
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                        >
                                            {user.patientfirstname}
                                        </th>
                                        <td className="px-6 py-4">{user.lastName}</td>
                                        <td className="px-6 py-4">{user.number}</td>
                                        <td className="px-6 py-4">{user.email}</td>
                                        <td className='px-6 py-4 text-blue-700 font-bold'>
                                            {user.signupStatus}
                                        </td>
                                        <td className="px-6 py-4">
                                            {user.signupStatus == 'unblock' ? (
                                                <button
                                                    className="font-medium text-red-600 dark:text-blue-500 hover:underline"
                                                    onClick={() => block(user._id)}
                                                >
                                                    Block
                                                </button>
                                            ) : (
                                                <button
                                                    className="font-medium text-green-400 dark:text-blue-500 hover:underline"
                                                    onClick={() => unblock(user._id)}
                                                >
                                                    Unblock
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </>
                        )}

                    </tbody>
                </table>
            </div>

            <div className="flex justify-center mt-4">
                <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="mr-2 bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded"
                >
                    <TbPlayerTrackPrevFilled />
                </button>

                {Array.from({ length: Math.ceil(users.length / doctorsPerPage) }).map((_, index) => (
                    <button
                        key={index}
                        onClick={() => paginate(index + 1)}
                        className={`mx-1 px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-customColor text-white' : 'bg-gray-200 hover:bg-gray-300'
                            }`}
                    >
                        {index + 1}
                    </button>
                ))}

                <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === Math.ceil(users.length / doctorsPerPage)}
                    className="ml-2 bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded"
                >
                    <TbPlayerTrackNextFilled />
                </button>
            </div>
        </>
    )
}

export default Usertable
