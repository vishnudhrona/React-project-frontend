import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import instance from '../../Axios/Axios';
import Slots from './Slots';
import { timeSlot } from '../../Redux/Reducers/patientSlice';
import { closingSlot } from '../../Redux/Reducers/patientSlice';

const Bookingpage = () => {
    const [doctor, setDoctor] = useState(null);
    const [scheduledTime, setScheduledTime] = useState(null);
    const [imageUrl, setImageUrl] = useState(null)
    const [showSlots, setShowSlots] = useState(false)
  
    const dispatch = useDispatch()
    const { doctorId } = useParams();

    const slotDetails = useSelector((state) => state.patientData.closingSlot)
    
    useEffect(() => {
      instance.get(`/usersidetimeschedule?docId=${doctorId}`).then((response) => {
        console.log(response, "i got frontend response");
        setDoctor(response.data.doctorProfile);
        setImageUrl(response.data.imageUrl)
        setScheduledTime(response.data.scheduledTime);
      });
    }, [doctorId]);
    
    // const handleDateChange = (date) => {
    //   setSelectedDate(date);
    // };
  
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
      <div className="h-10 w-full bg-white flex">
        <p className="text-sm p-2 font-semibold  text-blue-700">
          Available Time
        </p>
        {/* <div className="relative ml-auto pr-20">
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="yyyy-MM-dd"
            placeholderText="Select a date"
            className="w-21 px-4 py-2 border border-gray-600 rounded focus:outline-none focus:border-blue-500"
          />
          <CgCalendarDates className="absolute top-1/2 left-40 mt-5 text-blue-600 transform -translate-y-8 w-6 h-6 dark:text-gray-400" />
        </div> */}
      </div>
      <div className="h-80 w-full bg-white mt-3 p-5">
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
          <div className="grid grid-cols-3 gap-5 pl-5 h-60 overflow-auto">
            {scheduledTime &&
              scheduledTime.map((timeDetails, index) => (
                <>
                <button
                // to={'/slots'}
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
        </div>
      </div>
    </div>
  </>
  )
}

export default Bookingpage
