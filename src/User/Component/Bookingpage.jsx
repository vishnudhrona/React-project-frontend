import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import instance from '../../Axios/Axios';
import Slots from './Slots';
import { timeSlot } from '../../Redux/Reducers/patientSlice';
import { closingSlot } from '../../Redux/Reducers/patientSlice';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { TbPlayerTrackNextFilled, TbPlayerTrackPrevFilled } from 'react-icons/tb';
import { GrNext, GrPrevious } from "react-icons/gr";


const Bookingpage = () => {
  const [doctor, setDoctor] = useState(null);
  const [scheduledTime, setScheduledTime] = useState(null);
  const [imageUrl, setImageUrl] = useState(null)
  const [showSlots, setShowSlots] = useState(false)
  const [bookingDate, setBookingDate] = useState(null)
  const [currentPage, setCurrentPage] = useState(1);
  const [doctorsPerPage] = useState(6);

  const dispatch = useDispatch()
  const { doctorId } = useParams();

  const slotDetails = useSelector((state) => state.patientData.closingSlot)

  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const DoctorTimeSchedule = scheduledTime ? scheduledTime.slice(indexOfFirstDoctor, indexOfLastDoctor) : []

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    instance.get(`/usersidetimeschedule?docId=${doctorId}`).then((response) => {
      if (response) {
        setDoctor(response.data.doctorProfile);
        setImageUrl(response.data.imageUrl)
        setScheduledTime(response.data.scheduledTime);
      }
    });
  }, [doctorId, bookingDate]);

  const handleDate = (bookingDate) => {
    setBookingDate(bookingDate)
  }

  const searchDate = () => {
    try {
      const query = bookingDate.getTime()
      const filteredScheduledTime = scheduledTime.filter((time) => {
        let [day, month, year] = time.dateObject.split('/');
        day = parseInt(day);
        month = parseInt(month);
        year = parseInt(year);
        let formattedTime = new Date(year, month - 1, day);
        return formattedTime.getTime() === query
      })
      setScheduledTime(filteredScheduledTime)
    } catch (err) {
      console.error(err);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    try {
      searchDate()
    } catch (err) {
      console.error(err);
    }
  }

  const slotShowing = (timeId) => {
    setShowSlots(true)
    dispatch(closingSlot(true))
    dispatch(timeSlot(timeId))
  }

  return (
    <>
      <div className="bg-gray-500 w-full h-11 flex">
        <a href="/">
          <img
            className="h-10 object-cover pl-2"
            src="https://www.one-aster.com/themes/images/aster_Logo.png"
            alt=""
          />
        </a>
        <h1 className="text-white mx-auto pt-1 font-bold text-2xl">
          Book an Appointment
        </h1>
      </div>
      <div className="bg-gray-300 w-full h-screen p-5 ">
        <div className="h-10 w-full bg-white flex justify-between px-5">
          <p className="text-sm p-2 font-semibold  text-blue-700">
            Available Time
          </p>
          <form
            onSubmit={handleSubmit}
            className='px-10'
          >
            <div className='flex gap-3'>
              <DatePicker
                className="border rounded mr-auto"
                selected={bookingDate}
                name="date"
                onChange={handleDate}
                value={bookingDate}
                dateFormat="dd/MM/yyyy"
                placeholderText='Booking Date'
              />
              <button className='bg-customColor text-white rounded px-2 py-1' type='submit'>Search</button>
            </div>
          </form>
        </div>
        <div className="h-80 w-full bg-white mt-3 p-5 relative">

          {imageUrl && (
            <img
              className="absolute w-40"
              src={imageUrl}
              alt=""
            />
          )}
          <div className="flex justify-center align-middle">
            {showSlots && slotDetails && (
              <Slots />
            )}
          </div>

          <div className="flex pl-40 gap-10">
            {doctor && (
              <ul className="pl-5">
                <li className="font-medium text-xl">{doctor.firstname}</li>
                <li className="text-slate-600">{doctor.department}</li>
                <li className="text-slate-600">Kozhikode</li>
                <li className="text-blue-800">Fee : INR {doctor.fee}</li>
              </ul>
            )}
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="rounded hover:text-blue-600"
            >
              <GrPrevious />                </button>

            <div className="grid grid-cols-3 gap-5 pl-5 h-60">

              {scheduledTime &&
                DoctorTimeSchedule.map((timeDetails, index) => (
                  <>
                    <button
                      onClick={() => slotShowing(timeDetails._id)}
                    >
                      <div className="w-28" key={index}>
                        <div className="w-auto bg-slate-300 border border-slate-400 h-4 mb-1">
                          <span className="grid justify-center text-xs">
                            {timeDetails.dateOfWeek}
                          </span>
                        </div>
                        <div className="bg-slate-300 border border-slate-400">
                          <span className="flex justify-center text-xs">
                            {timeDetails.timeFromObject}-{timeDetails.timeToObject}
                          </span>
                          <span className="flex justify-center text-xs">
                            Slots : {timeDetails.slots}
                          </span>
                        </div>
                        <div className="bg-blue-950">
                          <span className="flex justify-center text-xs text-white">
                            {timeDetails.dateObject}
                          </span>
                        </div>
                      </div>
                    </button>
                  </>
                ))}
            </div>



            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === Math.ceil(scheduledTime ? scheduledTime.length / doctorsPerPage : [])}
              className="rounded hover:text-blue-600"
            >
              <GrNext />
            </button>

          </div>
        </div>
      </div>
    </>
  )
}

export default Bookingpage
