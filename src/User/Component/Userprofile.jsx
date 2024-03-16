import React, { useEffect, useState } from 'react'
import instance from '../../Axios/Axios'
import { useDispatch, useSelector } from 'react-redux'
import { TbPlayerTrackNextFilled, TbPlayerTrackPrevFilled } from 'react-icons/tb'
import './userprofile.css'
import Cancelbookingconfirm from './Cancelbookingconfirm';
import { bookingId } from '../../Redux/Reducers/patientSlice'
import { closingBooking } from '../../Redux/Reducers/patientSlice'
import { Link } from 'react-router-dom'

const Userprofile = () => {
    const [patientDetails, setPatientDetails] = useState({})
    const [bookingDetails, setBookingDetails] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [doctorsPerPage] = useState(2);
    const [isTransitionEnabled, setIsTransitionEnabled] = useState(false);
    const [showCancelBookingConfirm, setShowCancelBookingConfirm] = useState(false)

    const dispatch = useDispatch()

    const patientId = useSelector((state) => state.patientData.patientId)
    const bookingConfirm = useSelector((state) => state.patientData.closingBooking) 

    const indexOfLastDoctor = currentPage * doctorsPerPage;
    const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
    const patientBookinDetails = bookingDetails.slice(indexOfFirstDoctor, indexOfLastDoctor);

    const paginate = (pageNumber) => {
        setIsTransitionEnabled(true);
        setCurrentPage(pageNumber);
        setTimeout(() => {
            setIsTransitionEnabled(false);
        }, 500);
    }

    useEffect(() => {
        instance.get(`/fetchuserprofile?patientId=${patientId}`).then((response) => {
            setPatientDetails(response.data.response.patientDetails)
            setBookingDetails(response.data.response.bookingDetails)
        })
    }, [bookingConfirm])

    const deleteBooking = (slotId) => {
        setShowCancelBookingConfirm(true)
        dispatch(bookingId(slotId))
        dispatch(closingBooking(true))
    }

    return (
        <div className='userprofile-overlay w-full px-5 py-5 rounded-xl m-5'>
            <div className='absolute'>
                {showCancelBookingConfirm && bookingConfirm && (
                    <Cancelbookingconfirm />
                )}
            </div>
            <div className='flex gap-5'>
                <div className='bg-slate-400 px-5 py-5 rounded-xl flex flex-col items-center'>
                    <img src="https://cdn.iconscout.com/icon/free/png-256/free-user-1648810-1401302.png" alt="" />
                    {patientDetails && (
                        <>
                            <ul className='flex flex-col items-center font-bold'>
                                <li>{patientDetails.patientfirstname} {patientDetails.lastName}</li>
                                <li>{patientDetails.gender}</li>
                                <li>{patientDetails.email}</li>
                                <li>{patientDetails.number}</li>
                            </ul>
                            <Link to={`/edituserprofile/${patientDetails._id}`} className='bg-blue-500 px-2 py-1 text-white rounded mt-2'>Edit Profile</Link>
                        </>
                    )}
                </div>
                <div className='grid grid-rows-2'>
                    <div className='bg-slate-400 rounded-xl px-5 py-5 flex flex-col items-center'>
                        <h1 className='font-bold mb-4'>Address</h1>
                        <div className='bg-green-400 px-5 py-5 rounded-xl'>
                            <ul className="list-none text-white text-xs">
                                <li className="flex items-center"><span className="w-16 text-right mr-2">Address 1:</span> Valiyaveettil</li>
                                <li className="flex items-center"><span className="w-16 text-right mr-2">Post :</span>Kakkur</li>
                                <li className="flex items-center"><span className="w-16 text-right mr-2">Dist :</span> Kozhikode</li>
                                <li className="flex items-center"><span className="w-16 text-right mr-2">DOB :</span> 30/05/1995</li>
                                <li className="flex items-center"><span className="w-16 text-right mr-2">Pin :</span> 673616</li>
                            </ul>
                        </div>
                    </div>

                    <div className='bg-slate-400 rounded-xl px-5 py-5 flex flex-col items-center mt-5'>
                        <h1 className='font-bold mb-4'>Latest Appointment</h1>
                        <div className='bg-red-400 px-5 py-5 rounded-xl'>
                            <ul className="list-none text-white text-xs">
                                <li className="flex items-center"><span className="w-16 text-right mr-2">Department:</span> Psychology</li>
                                <li className="flex items-center"><span className="w-16 text-right mr-2">Doctor:</span>Somashekharan</li>
                                <li className="flex items-center"><span className="w-16 text-right mr-2">Type:</span> Consultation</li>
                                <li className="flex items-center"><span className="w-16 text-right mr-2">Date:</span> 30/05/1995</li>
                                <li className="flex items-center"><span className="w-16 text-right mr-2">Time:</span> 2:30 pm</li>
                            </ul>
                        </div>
                    </div>

                </div>
                <div className='bg-slate-400 px-5 py-5 rounded-xl flex flex-col items-center gap-4'>
                    <h1 className='font-bold'>Your Appointments</h1>
                    {bookingDetails && patientBookinDetails.map((booking, index) => (
                        <div
                                key={index}
                                className={`bg-blue-500 px-5 py-5 rounded-xl flex flex-col items-center ${
                                    isTransitionEnabled ? 'animate-slideIn' : '' // Apply transition effect class conditionally
                                }`}
                            >                            <ul className="list-none text-white text-xs">
                                <li className="flex items-center"><span className="w-16 text-right mr-2">Department:</span> {booking.department}</li>
                                <li className="flex items-center"><span className="w-16 text-right mr-2">Doctor:</span>{booking.doctorfirstname} {booking.doctorlastname}</li>
                                <li className="flex items-center"><span className="w-16 text-right mr-2">Type:</span> Consultation</li>
                                <li className="flex items-center"><span className="w-16 text-right mr-2">Date:</span> {booking.bookingDate}</li>
                                <li className="flex items-center"><span className="w-16 text-right mr-2">Time:</span> {booking.slotTime}</li>
                            </ul>
                            <button
                                className='bg-red-500 px-2 py-1 text-white text-sm rounded mt-3'
                                onClick={() => deleteBooking(booking._id)}
                            >
                                Cancel Booking
                            </button>
                        </div>
                    ))}
                    <div className="flex justify-center mt-4">
                {/* Previous page button */}
                <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="mr-2 bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded"
                >
                   <TbPlayerTrackPrevFilled />
                </button>
                
                {/* Next page button */}
                <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === Math.ceil(bookingDetails.length / doctorsPerPage)}
                    className="ml-2 bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded"
                >
                    <TbPlayerTrackNextFilled />
                </button>
            </div>
                </div>
            </div>
        </div>
    )
}
export default Userprofile
