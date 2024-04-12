import React, { useEffect, useState } from 'react'
import instance from '../../Axios/Axios'
import { TbPlayerTrackNextFilled, TbPlayerTrackPrevFilled } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';

const Paymenttable = () => {
    const [paymentDetails, setPaymentDetails] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [doctorsPerPage] = useState(5);
    const [pay, setPay] = useState('')
    const [paymentResponse ,setPaymentResponse] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        const adminToken = localStorage.getItem('adminToken')
        const headers = {
            'Authorization': `Bearer ${adminToken}`
          };
        instance.get('/admin/paymentmanagement',{ headers }).then((response) => {
            setPaymentDetails(response.data.response)
        })
    }, [paymentResponse])

    useEffect(() => {
        let accessToken = localStorage.getItem('adminToken')
        if(!accessToken) {
          navigate('/admin/adminlogin')
        }
      })

    const indexOfLastDoctor = currentPage * doctorsPerPage;
    const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
    const currentDoctors = paymentDetails.slice(indexOfFirstDoctor, indexOfLastDoctor);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    
    const payment = (id, totalAmount) => {
        try {
            instance.post('/admin/doctorpayment', { id, totalAmount }).then((response) => {
                setPay(response.data.order)
            })
        } catch (err) {
            console.error(err);
        }
    }
    
    useEffect(() => {
        if (pay) {
            try {
                var options = {
                    "key": "rzp_test_gFSzKrbiJVMqDa", // Enter the Key ID generated from the Dashboard
                    "amount": pay.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                    "currency": "INR",
                    "name": "Vishnu Dhrona",
                    "description": "Test Transaction",
                    "image": "https://example.com/your_logo",
                    "order_id": pay.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                    "callback_url": "https://eneqd3r9zrjok.x.pipedream.net/",
                    "handler": function (response) {
                        paymentVerification(response, pay)
                    },
                    "prefill": {
                        "name": "Gaurav Kumar",
                        "email": "gaurav.kumar@example.com",
                        "contact": "9999999999"
                    },
                    "notes": {
                        "address": "Razorpay Corporate Office"
                    },
                    "theme": {
                        "color": "#3399cc"
                    }
                };
                var rzp1 = new window.Razorpay(options);
                rzp1.open();
            } catch (err) {
                console.error(err);
            }
        }
    }, [pay])

    const paymentVerification = (res, order) => {
        try {
            instance.post('/admin/doctorverifypayment', { res, order }).then((response) => {
                setPaymentResponse(response.data.response.status)
            })
        } catch(err) {
            console.error(err);
        }
    }

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
                                Department
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Fee
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Consulting date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Payment status
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentDoctors.map((time, index) => (
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
                                        {time.doctorDetails.doctorFirstName} {time.doctorDetails.doctorLastName}
                                    </td>
                                    <td
                                        scope="row"
                                        className="px-6 py-4"
                                    >
                                        {time.doctorDetails.department}
                                    </td>
                                    <td className="px-6 py-4">
                                        {time.doctorDetails.fee}
                                    </td>
                                    <td className="px-6 py-4">
                                        {time.bookingDate}
                                    </td>
                                    <td className="px-6 py-4 text-blue-700 font-bold">
                                        {time.adminPaymentStatus}
                                    </td>
                                    <td className="px-6 py-4">
                                        {time.adminPaymentStatus === 'pending' ? (

                                        <button
                                            className="font-medium text-green-500 dark:text-green-600 hover:underline"
                                            onClick={() => payment(time._id, time.doctorDetails.fee)}
                                        >
                                            Pay
                                        </button>
                                        ) : (
                                            <div>
                                                <h1 className='font-bold text-green-400'>Completed</h1>
                                            </div>
                                        )}
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
                        className={`mx-1 px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-customColor text-white' : 'bg-gray-200 hover:bg-gray-300'
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

export default Paymenttable
