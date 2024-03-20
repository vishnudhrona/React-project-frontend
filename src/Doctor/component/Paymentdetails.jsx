import React, { useEffect, useState } from 'react'
import instance from '../../Axios/Axios'
import { useSelector } from 'react-redux'
import { TbPlayerTrackNextFilled, TbPlayerTrackPrevFilled } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'

const Paymentdetails = () => {
    const [paymentDetails, setPaymentDetails] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [doctorsPerPage] = useState(5);

    const navigate = useNavigate()

    const doctorId = useSelector((state) => state.doctorData.doctorId)

    const indexOfLastDoctor = currentPage * doctorsPerPage;
    const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
    const DoctorTimeSchedule = paymentDetails.slice(indexOfFirstDoctor, indexOfLastDoctor);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    useEffect(() => {
        const doctorToken = localStorage.getItem('doctorToken')
        const headers = {
            'Authorization': `Bearer ${doctorToken}`
          };
        instance.get(`/doctors/fetchdocpaymentdetails?doctorId=${doctorId}`, { headers }).then((response) => {
            if(response.data.status) {
                navigate('/doctors/doctorsignup')
            } else {
                setPaymentDetails(response.data.response)
            }
        })
    }, [])

    return (
        <>
        <div className="flex items-center justify-center border border-gray-300">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            No.
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Booking Date
                        </th>
                        <th scope="col" className="px-6 py-3">
                           Booking Time
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Email
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Number
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Status
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {DoctorTimeSchedule.map((time, index) => (
                            <>
                                <tr
                                    className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                                    key={index}
                                >
                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                        {index + 1}
                                    </th>
                                    <td
                                        scope="row"
                                        className="px-6 py-4"
                                    >
                                        {time.userFirstName} {time.userLastName}
                                    </td>
                                    <td
                                        scope="row"
                                        className="px-6 py-4"
                                    >
                                        {time.bookingDate}
                                    </td>
                                    <td className="px-6 py-4">
                                        {time.bookingTime}
                                    </td>
                                    <td className="px-6 py-4">
                                        {time.userEmail}
                                    </td>
                                    <td className="px-6 py-4">
                                        {time.userNumber}
                                    </td>
                                    <td className="px-6 py-4 text-blue-600 font-bold">
                                        {time.adminPaymentStatus}
                                    </td>
                                </tr>
                            </>
                        ))}
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
        
        {Array.from({ length: Math.ceil(paymentDetails.length / doctorsPerPage) }).map((_, index) => (
            <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={`mx-1 px-3 py-1 rounded ${
                    currentPage === index + 1 ? 'bg-customColor text-white' : 'bg-gray-200 hover:bg-gray-300'
                }`}
            >
                {index + 1}
            </button>
        ))}
        
        <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === Math.ceil(paymentDetails.length / doctorsPerPage)}
            className="ml-2 bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded"
        >
            <TbPlayerTrackNextFilled />
        </button>
    </div>
    </>
    )
}

export default Paymentdetails
