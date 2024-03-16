import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import instance from '../../Axios/Axios';
import { useSelector } from 'react-redux';
import { TbPlayerTrackNextFilled, TbPlayerTrackPrevFilled } from 'react-icons/tb';

const Doctorbookingstable = () => {
    const [bookingDetails, setBookingDetails] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [doctorsPerPage] = useState(5);

    const doctorId = useSelector((state) => state.doctorData.doctorId);

    bookingDetails && (
        bookingDetails.sort((a, b) => {
            const dateA = new Date(a.bookingDate.split('/').reverse().join('/'));
            const dateB = new Date(b.bookingDate.split('/').reverse().join('/'));
            return dateA - dateB;
        })
        )
        
        const indexOfLastDoctor = currentPage * doctorsPerPage;
        const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
        const DoctorBookinDetails = bookingDetails.slice(indexOfFirstDoctor, indexOfLastDoctor);

        const paginate = (pageNumber) => setCurrentPage(pageNumber);

    useEffect(() => {
        instance.get(`/doctors/fetchbookingdetails?doctorId=${doctorId}`).then((bookings) => {
                console.log(bookings.data.response, "zzzzeeeeee");
                setBookingDetails(bookings.data.response);
            });
    }, [doctorId]);

    return (
        <>
            <div className="flex items-center justify-center border border-gray-300">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                No.
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Patient Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Number
                            </th>
                            <th scope="col" className="px-6 py-3">
                                DOB
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Booking Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Booking Time
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    {bookingDetails && DoctorBookinDetails.map((bookings, index) => (
                        <>
                            <tbody>
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
                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                        {bookings.patientfirstname} {bookings.lastname}
                                    </th>
                                    <td className="px-6 py-4">{bookings.patientemail}</td>
                                    <td className="px-6 py-4">{bookings.patientnum}</td>
                                    <td className="px-6 py-4">{bookings.bookingDate}</td>
                                    <td className="px-6 py-4">{bookings.slotTime}</td>
                                    <td className="px-6 py-4">
                                        <Link
                                            to={`/doctors/videocall?bookinguseremail=${bookings.patientemail}&patientId=${bookings.patientId}`}
                                            className="font-medium text-red-600 dark:text-blue-500 hover:underline">
                                            Video call
                                        </Link>
                                    </td>
                                </tr>
                            </tbody>
                        </>
                    ))}

                </table>
            </div>

            <div className="flex justify-center mt-4">
                {/* Previous page button */}
                <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="mr-2 bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded"
                >
                   <TbPlayerTrackPrevFilled />
                </button>
                
                {/* Page numbers */}
                {Array.from({ length: Math.ceil(bookingDetails.length / doctorsPerPage) }).map((_, index) => (
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
                
                {/* Next page button */}
                <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === Math.ceil(bookingDetails.length / doctorsPerPage)}
                    className="ml-2 bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded"
                >
                    <TbPlayerTrackNextFilled />
                </button>
            </div>
        </>
    )
}

export default Doctorbookingstable
