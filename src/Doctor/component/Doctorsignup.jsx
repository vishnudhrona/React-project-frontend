import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import instance from '../../Axios/Axios';

const Doctorsignup = () => {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        department: '',
        gender: '',
        number: '',
        email: '',
        password: ''
      });
    const [formErrors, setFormErrors] = useState({}); 
    const [department, setDepartment] = useState([])
    
    const navigate = useNavigate()  

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
      };

      useEffect(() => {
        try {
            instance.get('/admin/fetchdepartment').then((response) => {
                setDepartment(response.data.department || [])
            })
        } catch (err) {
            console.error(err);
        }
    }, [])

      const handleSubmit = (e) => {
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

            if (!formData.firstname) {
                validationErrors.firstname = "First name is required";
            } else if (!nameRegex.test(formData.firstname)) {
                validationErrors.firstname = "Name not in valid format"
            }

            if (!formData.lastname) {
                validationErrors.lastname = "Last name is required";
            } else if (!nameRegex.test(formData.lastname)) {
                validationErrors.lastname = "Name not in valid format"
            }

            if (!formData.department) {
                validationErrors.department = "Department is required";
            } else if(!nameRegex.test(formData.department)) {
                validationErrors.department = 'Department is required'
            }

            if (!formData.gender) {
                validationErrors.gender = "Gender is required";
            } else if(!nameRegex.test(formData.gender)) {
                validationErrors.gender = "Enter only your gender"
            }

            if (!formData.number) {
                validationErrors.number = "Number is required";
            }

            if (Object.keys(validationErrors).length > 0) {
                setFormErrors(validationErrors);
                return;
            }

            instance.post('/doctors/doctorsignup',{formData}).then((response) => {
                if(response.data.status) {
                    navigate(`/doctors/docotpverification/${formData.number}`)
                } else {
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
                }
            })
        } catch(err) {
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
                    backgroundImage: `url(${'https://c4.wallpaperflare.com/wallpaper/679/351/670/soft-gradient-solid-color-gradient-hd-wallpaper-preview.jpg'})`, // Set the background image
                    backgroundSize: 'cover', // Adjust background size as needed
                    backgroundPosition: 'center', // Adjust background position as needed
                    minHeight: '100vh' // Ensure the background covers the entire viewport
                }}
            >
                <div className="signup-overlay p-5 rounded shadow-md w-80">
                    <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
                    <form 
                    onSubmit={handleSubmit}
                    >
                        <div className="flex gap-4 mb-4">
                            <div>
                                <input
                                    type="text"
                                    name="firstname"
                                    placeholder="First Name"
                                    className="w-full border rounded "
                                    value={formData.firstname}
                                    onChange={handleChange}
                                />
                                {formErrors.firstname && (
                                    <span className="text-red-500 text-xs">
                                        {formErrors.firstname}
                                    </span>
                                )}
                            </div>

                            <div>
                                <input
                                    type="text"
                                    name="lastname"
                                    placeholder="Last Name"
                                    className="w-full p-2 border rounded"
                                    value={formData.lastname}
                                    onChange={handleChange}
                                />
                                {formErrors.lastname && (
                                    <span className="text-red-500 text-xs">{formErrors.lastname}</span>
                                )}
                            </div>

                        </div>

                        <div className="flex gap-4 mb-4">
                                <div>
                                <select
                                    name="department"
                                    value={formData.department}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                >
                                    <option value="">Select Department</option>
                                    {department && department.map((dep, index) => (
                                        <>
                                    <option key={index} value={dep.department}>{dep.department}</option>
                                    </>
                                    ))}

                                    {/* Add more options as needed */}
                                </select>
                                {formErrors.department && (
                                    <span className="text-red-500 text-xs">{formErrors.department}</span>
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
                        to={"/doctors/doctorlogin"}
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

export default Doctorsignup
