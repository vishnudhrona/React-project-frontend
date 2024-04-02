import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FcGoogle } from "react-icons/fc";
import instance from '../../Axios/Axios';
import { patientId } from '../../Redux/Reducers/patientSlice';
import { name } from '../../Redux/Reducers/patientSlice';
import { useDispatch } from 'react-redux';

const Googleauthform = () => {
    const [formData, setFormData] = useState("");
    const [dob, setDob] = useState(null)
    const [formErrors, setFormErrors] = useState({});

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const googleAuthDetails = searchParams.get('authcredential')
    const authDetails = JSON.parse(googleAuthDetails)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleDate = (dob) => {
        setDob(dob)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        try {
            const validationErrors = {};

            if(!dob) {
                validationErrors.dob = "Date of birth is required";
            }

            if (!formData.gender) {
                validationErrors.gender = "Gender is required";
            }

            if (!formData.number) {
                validationErrors.number = "Number is required";
            }

            if (Object.keys(validationErrors).length > 0) {
                setFormErrors(validationErrors);
                return;
            }

            instance.post('/googleauthenticationlogin',{ formData, authDetails, dob }).then((response) => {
                console.log(response.data.authUser,'new auth user responseeee');
                if(response.data.authUser) {
                    localStorage.setItem('token',response.data.token)
                    dispatch(patientId(response.data.authUser._id))
                    dispatch(name(response.data.authUser.patientfirstname))
                    navigate('/')
                }
            })

        } catch(err) {
            console.error(err);
        }
    }

    return (
        <>
            <div className="flex justify-center items-center"
                style={{
                    backgroundImage: `url(${'https://wallpapercave.com/wp/wp2968489.jpg'})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    minHeight: '100vh'
                }}
            >
                <div className="signup-overlay p-5 rounded shadow-md w-80">
                    <h2 className="text-2xl font-semibold mb-4">Google Auth</h2>
                    <form className=''
                    onSubmit={handleSubmit}
                    >
                        <div className="grid justify-center items-center w-full">
                            <div className='mb-3 grid'>
                                <DatePicker
                                    className="p-2 border rounded"
                                    selected={dob}
                                    name="date"
                                    onChange={handleDate}
                                    value={dob}
                                    dateFormat="dd/MM/yyyy"
                                    placeholderText='Date of Birth'
                                />
                                {formErrors.dob && (
                                    <span className="text-red-500 text-xs">{formErrors.dob}</span>
                                )}
                            </div>
                            <div className='mb-3 grid'>
                                <input
                                    type="text"
                                    name="gender"
                                    placeholder="Gender"
                                    className="p-2 border rounded"
                                value={formData.gender}
                                onChange={handleChange}
                                />
                                {formErrors.gender && (
                                    <span className="text-red-500 text-xs">{formErrors.gender}</span>
                                )}
                            </div>
                            <div className='mb-3 grid'>
                                <input
                                    type="number"
                                    name="number"
                                    placeholder="Number"
                                    className="p-2 border rounded"
                                value={formData.number}
                                onChange={handleChange}
                                />
                                {formErrors.number && (
                                    <span className="text-red-500 text-xs">{formErrors.number}</span>
                                )}
                            </div>
                        <div className='flex justify-center mt-3'>
                            <button
                                type="submit"
                                className=" bg-slate-200 text-xs p-2 rounded hover:bg-slate-400"
                            >
                                <div className='flex justify-between items-center'>
                                <span><FcGoogle /></span>
                                <span>Sign in with Google</span>
                                </div>
                            </button>
                        </div>
                        </div>

                    </form>
                </div>
            </div>
        </>
    )
}

export default Googleauthform
