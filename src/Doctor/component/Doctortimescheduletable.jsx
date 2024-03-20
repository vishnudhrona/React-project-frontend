import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Doctorscheduletime from './Doctorscheduletime';
import instance from '../../Axios/Axios';
import { TbPlayerTrackNextFilled, TbPlayerTrackPrevFilled } from 'react-icons/tb';
import { scheduleClose } from '../../Redux/Reducers/doctorSlice';
import Deletescheduleconfirm from './Deletescheduleconfirm';
import { scheduleId } from '../../Redux/Reducers/doctorSlice';
import { scheduleDeleteConfirm } from '../../Redux/Reducers/doctorSlice';
import { useNavigate } from 'react-router-dom';

const Doctortimescheduletable = () => {
    const [showScheduleForm, setScheduleForm] = useState(false)
    const [scheduledTime, setScheduledTime] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [doctorsPerPage] = useState(5);
    const [deleteConfirm, setDeleteConfirm] = useState(false)
    
    const dispatch = useDispatch()
    const navigate = useNavigate()

    scheduledTime.sort((a, b) => {
        const dateA = new Date(a.dateObject.split('/').reverse().join('/'));
        const dateB = new Date(b.dateObject.split('/').reverse().join('/'));
        return dateA - dateB;
      });
      
    const indexOfLastDoctor = currentPage * doctorsPerPage;
    const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
    const DoctorTimeSchedule = scheduledTime.slice(indexOfFirstDoctor, indexOfLastDoctor);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const docId = useSelector((state) => state.doctorData.doctorId)
    const schedule = useSelector((state) => state.doctorData.scheduleClose)
    const confirmDelete = useSelector((state) => state.doctorData.scheduleDeleteConfirm)

    useEffect(() => {
        const doctorToken = localStorage.getItem('doctorToken')
        const headers = {
            'Authorization': `Bearer ${doctorToken}`
          };
        instance.get(`/doctors/fetchtimeschedule?docId=${docId}`, { headers }).then((timeSchedule) => {
            if(timeSchedule.data.status) {
                navigate('/doctors/doctorsignup')
            } else {
                setScheduledTime(timeSchedule.data.timeSchedule)
            }
        })
      },[docId, schedule, confirmDelete])

      useEffect(() => {
        instance.post('/doctors/deletepastschedule').then((response) => {
            console.log(response.data.response,'i got deleted schedule count');
        })
      }, [])

      const toggleScheduleForm = () => {
        setScheduleForm(true);
        dispatch(scheduleClose(true))
    };

    const deleteSchedule = (timeId) => {
        setDeleteConfirm(true)
        dispatch(scheduleId(timeId))
        dispatch(scheduleDeleteConfirm(true))
    }


    return (
        <>
        <div className='relative'>
            <button
                className="border bg-buttonColor text-white px-5 py-1 rounded mt-5 mb-5"
                onClick={toggleScheduleForm}
            >
                Add Your Schedule
            </button>
            <div className='absolute'>
                {showScheduleForm && schedule && (
                    <Doctorscheduletime />
                )}
            </div>
            <div className='absolute'>
                {deleteConfirm && confirmDelete && (
                    <Deletescheduleconfirm />
                )}
            </div>
            <div className="flex items-center justify-center border border-gray-300">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                No.
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Week Day
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Time From
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Time To
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Slots
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
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
                                        {time.dateOfWeek}
                                    </td>
                                    <td
                                        scope="row"
                                        className="px-6 py-4"
                                    >
                                        {time.dateObject}
                                    </td>
                                    <td className="px-6 py-4">
                                        {time.timeFromObject}
                                    </td>
                                    <td className="px-6 py-4">
                                        {time.timeToObject}
                                    </td>
                                    <td className="px-6 py-4">
                                        {time.slots}
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                          className="font-medium text-red-600 dark:text-blue-500 hover:underline"
                                          onClick={() => deleteSchedule(time._id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            </>
                        ))}
                    </tbody>
                </table>
            </div>
            </div>

            <div className="flex justify-center mt-4">
                <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="mr-2 bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded"
                >
                   <TbPlayerTrackPrevFilled />
                </button>
                
                {Array.from({ length: Math.ceil(scheduledTime.length / doctorsPerPage) }).map((_, index) => (
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
                    disabled={currentPage === Math.ceil(scheduledTime.length / doctorsPerPage)}
                    className="ml-2 bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded"
                >
                    <TbPlayerTrackNextFilled />
                </button>
            </div>
        </>
    )
}

export default Doctortimescheduletable
