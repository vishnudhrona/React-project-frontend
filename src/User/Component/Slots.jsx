import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import instance from '../../Axios/Axios'
import { closingSlot } from '../../Redux/Reducers/patientSlice'

const Slots = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [doctor, setDoctor] = useState(null)
  const [timeSchedule, setTimeSchedule] = useState(null)
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [slotTime, setSlotTime] = useState(null)
  const [bookings, setBookings] = useState('')
  const [hiddenValue, setHiddenValue] = useState([])

  let bookedDate = ''
  timeSchedule && (
    bookedDate = timeSchedule._id
  )

  let docId = ''
  doctor && doctor.doctor && (
    docId = doctor.doctor._id
  )

  let doctorId = ''
  doctor && doctor.doctor && (
    doctorId = doctor.doctor.doctorId
  )

  let bookingDate = ''
  timeSchedule && timeSchedule.dateObject && (
    bookingDate = timeSchedule.dateObject
  )

  useEffect(() => {
    if (timeSchedule) {
      let slots = timeSchedule.slots
      let timeFrom = timeSchedule.timeFromObject
      let timeTo = timeSchedule.timeToObject

      const startTime = new Date(`2000-01-01 ${timeFrom}`);
      const endTime = new Date(`2000-01-01 ${timeTo}`);

      const timeDiffMillis = endTime - startTime;
      const intervalMillis = timeDiffMillis / slots;

      const updatedSelectedTimes = [];

      for (let i = 1; i <= slots; i++) {
        const newTime = new Date(startTime.getTime() + i * intervalMillis);
        let hours = newTime.getHours().toString().padStart(2, '0');
        const minutes = newTime.getMinutes().toString().padStart(2, '0');
        const amPM = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;

        const slotTime = {
          hours: hours,
          minutes: minutes,
          amPm: amPM
        };

        updatedSelectedTimes.push(slotTime);

      }
      const notBookedTimes = updatedSelectedTimes.filter(timeSlot => !isSlotTimeBooked(`${timeSlot.hours}:${timeSlot.minutes} ${timeSlot.amPm}`));

      setSelectedTimes(notBookedTimes);

    }
  }, [timeSchedule])

  function isSlotTimeBooked(slotTime) {
    return hiddenValue.some(booking => booking.slotTime === slotTime);
  }

  const handleSlots = () => {
    dispatch(closingSlot(false))
  }

  const handleTimeSelection = (slotTime) => {
    setSlotTime(slotTime)
  }

  const timeDetails = useSelector((state) => state.patientData.timeSlot)

  useEffect(() => {
    instance.get(`/timeslots?timeId=${timeDetails}`).then((response) => {
      setDoctor(response.data)
      setTimeSchedule(response.data.timeSchedule)
    })
  }, [timeDetails])

  useEffect(() => {
    instance.get(`/hiddenbookingtime?bookingdate=${bookingDate}&doctorId=${doctorId}`).then((response) => {
      setHiddenValue(response.data.equalDate)
    })
  }, [bookingDate, doctorId])


  let patientId = useSelector((state) => state.patientData.patientId)

  let consultDate = ''
  timeSchedule && timeSchedule.dateObject && (
    consultDate = timeSchedule.dateObject
  )

  let bookingSlot = () => {
    let userToken = localStorage.getItem('token')

    const headers = {
      'Authorization': `Bearer ${userToken}`
    };
    
    instance.post('/userbookingslots', { slotTime, doctorId, patientId, consultDate }, { headers }).then((response) => {
      if (response.data.status) {
        navigate('/login')
      } else {
        setBookings(response.data.response)
        navigate(`/paymentinfo?doctorId=${docId}&dateId=${bookedDate}`)
      }
    })
  }

  return (
    <>
      <div className="slots-overlay w-[700px] h-auto bg-slate-100 rounded-lg">
        <div className="h-10 bg-slot flex justify-between items-center">
          <span className="text-white px-2 font-semibold">Select Slot</span>
          <button
            className=" text-white px-3"
            onClick={handleSlots}
          >
            X
          </button>
        </div>

        {doctor && doctor.imageUrl && (
          <div className="px-5 py-3">
            <span className="">{doctor.department}</span>
            <div className="flex">
              <img
                className="w-10 h-10 mt-2 rounded-full"
                src={doctor.imageUrl}
                alt="Rounded avatar"
              />
              <div className="grid py-2 px-2">
                <span className="text-sm font-medium text-slot">
                  {doctor.doctor.firstname} {doctor.doctor.lastname}
                </span>
                <span className="text-lg text-slate-500">
                  {doctor.doctor.degree}
                </span>
              </div>
            </div>
          </div>
        )}

        <hr className="border-t border-gray-300" />
          <div>

            {timeSchedule && doctor && doctor.doctor && (
              <div className="py-2 px-5 grid grid-rows-2">
                <span className="text-slate-600 font-medium">Please pick an available slot</span>
                <div className="flex justify-between py-2">
                  <span className="text-lg text-slate-600">Consulting Time - {timeSchedule.timeFromObject} to {timeSchedule.timeToObject}</span>
                  <span className="text-lg text-slot">INR {doctor.doctor.fee}</span>
                </div>
              </div>
            )}

            <hr className="border-t border-gray-300" />
            <div className="flex px-5 py-3">
              <div className="grid grid-cols-9 gap-2">
                {timeSchedule && (
                  <>
                    <button
                      className="bg-slate-200 text-slate-500 rounded-md text-xs p-1 hover:bg-slate-400"
                      onClick={() => handleTimeSelection(timeSchedule.timeFromObject)}
                    >
                      {timeSchedule.timeFromObject}
                    </button>
                  </>
                )}
                {selectedTimes.map((slotTimes, index) => (
                  <>
                    <button
                      className={`bg-slate-200 text-slate-500 rounded-md text-xs p-1 hover:bg-slate-400 hover:text-white ${`${slotTimes.hours}:${slotTimes.minutes} ${slotTimes.amPm}` === slotTime ? 'bg-slate-400 text-white' : ''
                        }`}
                      key={index}
                      onClick={() => handleTimeSelection(`${slotTimes.hours}:${slotTimes.minutes} ${slotTimes.amPm}`)}
                    >
                      {slotTimes.hours} : {slotTimes.minutes} {slotTimes.amPm}
                    </button>
                  </>
                ))}
              </div>
            </div>
          </div>
        <hr className="border-t border-gray-300" />
        <div className="py-5 flex justify-center ">
          <Link
            className="bg-slotButton flex justify-center w-5/6 rounded-md p-1 text-white hover:bg-green-400"
            onClick={bookingSlot}
          >
            Reserve Slot
          </Link>
        </div>
      </div>

    </>
  )
}

export default Slots
