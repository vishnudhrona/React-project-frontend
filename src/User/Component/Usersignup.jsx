import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import instance from '../../Axios/Axios';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Usersignup = () => {

    const initialValues = { patientfirstname: "", lastName: "", gender: "", number: "", email: "", password: "" }
    const [formData, setFormData] = useState(initialValues);
    const [dob, setDob] = useState(null)
    const [formErrors, setFormErrors] = useState({});

    const navigate = useNavigate()

    let formattedDob = ''
    dob && (
        formattedDob = dob.toString()
    )

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleDate = (dob) => {
        setDob(dob)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const validationErrors = {};

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const nameRegex = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;

            if (!formData.email.includes("@")) {
                validationErrors.email = "Invalid email address";
            } else if (!emailRegex.test(formData.email)) {
                validationErrors.email = "Email not in valid format"
            }

            if (formData.password.length < 6) {
                validationErrors.password = "Password must be at least 6 characters";
            }

            if (!formData.patientfirstname) {
                validationErrors.patientfirstname = "First name is required";
            } else if (!nameRegex.test(formData.patientfirstname)) {
                validationErrors.patientfirstname = "Name not in valid format"
            }

            if (!formData.lastName) {
                validationErrors.lastName = "Last name is required";
            } else if (!nameRegex.test(formData.lastName)) {
                validationErrors.lastName = "Name not in valid format"
            }

            if (!dob) {
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

            const response = await instance.post("/signup", { formData, dob });
            if (response.data.status) {
                toast.error(response.data.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Zoom,
                });
            } else {
                navigate(`/otpverification/${formData.number}`)
            }
        } catch (err) {
            console.error(err);
        }
    }
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                transition={Zoom}
            />
            <div className="flex justify-center items-center"
                style={{
                    backgroundImage: `url(${'https://wallpapercave.com/wp/wp2968489.jpg'})`, // Set the background image
                    backgroundSize: 'cover', // Adjust background size as needed
                    backgroundPosition: 'center', // Adjust background position as needed
                    minHeight: '100vh' // Ensure the background covers the entire viewport
                }}
            >
                <div className="signup-overlay p-5 rounded shadow-md w-80">
                    <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="flex gap-4 mb-4">
                            <div>
                                <input
                                    type="text"
                                    name="patientfirstname"
                                    placeholder="First name"
                                    className="w-full border rounded "
                                    value={formData.patientfirstname}
                                    onChange={handleChange}
                                />
                                {formErrors.patientfirstname && (
                                    <span className="text-red-500 text-xs">
                                        {formErrors.patientfirstname}
                                    </span>
                                )}
                            </div>

                            <div>
                                <input
                                    type="text"
                                    name="lastName"
                                    placeholder="Last Name"
                                    className="w-full p-2 border rounded"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                />
                                {formErrors.lastName && (
                                    <span className="text-red-500 text-xs">{formErrors.lastName}</span>
                                )}
                            </div>

                        </div>

                        <div className="flex gap-4 mb-4">
                            <div>
                                <DatePicker
                                    className="p-2 border rounded datepicker-input"
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
                            <div>
                                <input
                                    type="text"
                                    name="gender"
                                    placeholder="Gender"
                                    className="w-full p-2 border rounded"
                                    value={formData.gender}
                                    onChange={handleChange}
                                />
                                {formErrors.gender && (
                                    <span className="text-red-500 text-xs">{formErrors.gender}</span>
                                )}
                            </div>
                        </div>

                        <div className="flex gap-4 mb-4">
                            <div>
                                <input
                                    type="number"
                                    name="number"
                                    placeholder="Number"
                                    className="w-full p-2 border rounded"
                                    value={formData.number}
                                    onChange={handleChange}
                                />
                                {formErrors.number && (
                                    <span className="text-red-500 text-xs">{formErrors.number}</span>
                                )}
                            </div>

                            <div>
                                <input
                                    type="text"
                                    name="email"
                                    placeholder="Email"
                                    className="w-full p-2 border rounded"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                                {formErrors.email && (
                                    <span className="text-red-500 text-xs">{formErrors.email}</span>
                                )}
                            </div>
                        </div>

                        <div className="mb-4">
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                className="w-full p-2 border rounded"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            {formErrors.password && (
                                <span className="text-red-500 text-xs">{formErrors.password}</span>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-buttonColor text-white p-2 rounded hover:bg-buttonColor"
                        >
                            Sign Up
                        </button>
                    </form>
                    <Link
                        to={"/login"}
                        type="button"
                        className="text-buttonColor bg-white hover:bg-gray-100 border border-buttonColor focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium text-sm p-2 inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 w-full justify-center mt-3"
                    >
                        New User? Sign up
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Usersignup
