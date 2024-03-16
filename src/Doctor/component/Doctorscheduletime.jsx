import "flowbite";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CgCalendarDates } from "react-icons/cg";
import instance from "../../Axios/Axios";
import { useDispatch, useSelector } from "react-redux";
import { scheduleClose } from "../../Redux/Reducers/doctorSlice";
import { useNavigate } from "react-router-dom";


const Doctorscheduletime = () => {
    const [date, setDate] = useState(null);
    const [timefrom, setTimefrom] = useState(null)
    const [timeto, setTimeto] = useState(null)
    const [slots, setSlots] = useState('')
    const [formErrors, setFormErrors] = useState({});

    const dispatch = useDispatch()

    let formattedDate
    date && (
        formattedDate = date.toString()
    )

    let formattedTimeFrom
    timefrom && (
        formattedTimeFrom = timefrom.toString()
    )
    
    let formattedTimeTo
    timeto && (
        formattedTimeTo = timeto.toString()
    )

    const doctorId = useSelector((state) => state.doctorData.doctorId)

    const handleDate = (date) => {
        setDate(date)
    };

    const handleTimefrom = (timefrom) => {
        setTimefrom(timefrom)
    }

    const handleTimeto = (timeto) => {
        setTimeto(timeto)
    }

    const handleSlots = (e) => {
        let slot = e.target.value
        setSlots(slot)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        try {
            const validationErrors = {};

            if (!date) {
                validationErrors.date = "Date is required";
            }

            if(!timefrom) {
                validationErrors.timefrom = "Time is required"
            }

            if(!timeto) {
                validationErrors.timeto = "Time is required"
            }

            if(!slots) {
                validationErrors.slots = "Slots is required"
            }

            if (Object.keys(validationErrors).length > 0) {
                setFormErrors(validationErrors);
                return;
            }

            const body = {
                date,
                formattedTimeFrom,
                formattedTimeTo,
                slots,
                doctorId
            }

            instance.post('/doctors/timeschedule',body,{
                headers: {
                    'Content-Type' : 'application/json'
                  },
            }).then((response) => {
                console.log(response.data.response.status,'status');
                dispatch(scheduleClose(false))
            })

        } catch (err) {
            console.error(err);
        }
    }

    const scheduleFormClose = () => {
        dispatch(scheduleClose(false))
    }
    return (
        <>
            <div className="doctor-schedule-time-container timeschedule-overlay py-5 px-5">
                <form onSubmit={handleSubmit}>
                    <div className="flex gap-4">
                        <div className="flex flex-col">
                        <h1 className="">Select Date</h1>
                        <div className="relative">
                            <DatePicker
                                selected={date}
                                name="date"
                                onChange={handleDate}
                                value={date}
                                minDate={new Date()}
                                dateFormat="dd/MM/yyyy" // Customize the date format
                            />
                            <CgCalendarDates className="absolute top-1/2 left-40 mt-5 text-blue-600 transform -translate-y-8 w-6 h-6 dark:text-gray-400" />
                        </div>
                                {formErrors.date && (
                                    <span className="text-red-500 text-xs">{formErrors.date}</span>
                                )}
                        </div>
                        <div className="flex flex-col">
                            <h1>Select time from</h1>
                        <div className="relative">
                            <DatePicker
                                selected={timefrom}
                                name="timefrom"
                                onChange={handleTimefrom}
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={30}
                                timeCaption="Time"
                                dateFormat="h:mm aa"
                                value={timefrom}
                            />
                        </div>
                        {formErrors.timefrom && (
                            <span className="text-red-500 text-xs">{formErrors.timefrom}</span>
                                )}
                        </div>
                    </div>
                    <div className="flex gap-4">
                    <div className="flex flex-col">
                        <h1>select time to</h1>
                        <div className="relative">
                            <DatePicker
                                selected={timeto}
                                name="timeto"
                                onChange={handleTimeto}
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={30}
                                dateFormat="h:mm aa"
                                value={timeto}
                            />
                        </div>
                        {formErrors.timeto && (
                            <span className="text-red-500 text-xs">{formErrors.timeto}</span>
                                )}
                        </div>
                        <div className="flex flex-col">
                        <h1>Slots</h1>
                        <div className="relative">
                            <input
                                type="text"
                                name="slots"
                                onChange={handleSlots}
                                value={slots}
                            />
                        </div>
                        {formErrors.slots && (
                            <span className="text-red-500 text-xs">{formErrors.slots}</span>
                                )}
                        </div>
                    </div>
                    <div className="pt-5 flex justify-center item-center gap-4">
                        <button className="bg-buttonColor hover:bg-green-500 text-white px-1 py-1 w-1/2" type="submit">
                            Submit
                        </button>
                        <button 
                        onClick={scheduleFormClose}
                        className="bg-red-500 hover:bg-red-600 text-white px-1 py-1 w-1/2" type="submit"
                        >
                            Clsoe
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Doctorscheduletime
