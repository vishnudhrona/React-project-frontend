import React, { useEffect, useState } from 'react'
import instance from '../../Axios/Axios';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Adminlogin = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [formErrors, setFormErrors] = useState({});

    const navigate = useNavigate()

    useEffect(() => {
        const accessToken = localStorage.getItem('adminToken')
        if(!accessToken) {
          navigate('/admin/adminlogin')
        } else {
          navigate('/admin/doctormanagement')
        } 
      },[navigate])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        try {
            const validationErrors = {};

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!formData.email) {
                validationErrors.email = "Invalid email address";
            } else if (!emailRegex.test(formData.email)) {
                validationErrors.email = "Email not in valid format"
            }

            if (formData.password.length < 6) {
                validationErrors.password = "Password must be at least 6 characters";
            }

            if (Object.keys(validationErrors).length > 0) {
                setFormErrors(validationErrors);
                return;
            }

            instance.post('/admin/adminlogin', { formData }).then((response) => {
                if(response.data.response.status) {
                    localStorage.setItem('adminToken', response.data.auth)
                    navigate('/admin/doctormanagement')
                } else {
                    toast.error("Invalid credentials", {
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
            <div className=""
                style={{
                    backgroundImage: `url(${'https://cdn.shopify.com/s/files/1/0078/7044/7669/articles/How_to_Set_up_Laptops_for_Employees_Working_Remotely.jpg?v=1685979922'})`, // Set the background image
                    backgroundSize: 'cover', 
                    backgroundPosition: 'center', 
                    minHeight: '100vh' 
                }}>
                <div className="flex justify-center items-center h-screen">
                    <div className="admin-overlay p-5 overflow-auto rounded shadow-md w-80">
                        <h2 className="text-2xl font-semibold mb-4">Admin LogIn</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <input
                                    type="text"
                                    name="email"
                                    placeholder="Email"
                                    className="w-full p-2 border rounded"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                                {formErrors.email && (
                                    <span className="text-red-700 text-xs">{formErrors.email}</span>
                                )}
                            </div>

                            <div className="">
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    className="w-full p-2 border rounded"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                                {formErrors.password && (
                                    <span className="text-red-700 text-xs">{formErrors.password}</span>
                                )}
                            </div>
                            <div className="flex justify-between items-center pt-2">
                                <button className="pb-5 text-xs text-blue-400">
                                    Forgot Password?
                                </button>
                                <button
                                    type="submit"
                                    className=" bg-buttonColor text-white p-2 text-xs hover:bg-buttonColor"
                                >
                                    LogIn
                                </button>
                            </div>
                            <div className="pt-5">
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Adminlogin
