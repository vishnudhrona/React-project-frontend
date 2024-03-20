import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import instance from '../../Axios/Axios';
import { doctorId } from '../../Redux/Reducers/doctorSlice';
import { useDispatch } from 'react-redux';

const Doctorlogin = () => {

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    useEffect(() => {
        const accessToken = localStorage.getItem('doctorToken')
        if (!accessToken) {
            navigate('/doctors/doctorlogin')
        } else {
            navigate('/doctors/patientbookingdetails')
        }
    }, [navigate])

    const handleSubmit = (e) => {
        e.preventDefault()
        try {
            instance.post('/doctors/doctorlogin', { formData }).then((response) => {
                if (response.data.status) {
                    if (response.data.user.signupStatus === "Approved") {
                        localStorage.setItem('doctorToken', response.data.auth)
                        dispatch(doctorId(response.data.user._id))
                        navigate('/doctors/patientbookingdetails')
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
                } else {
                    toast.error(response.data.error, {
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
            <div className="bg-slate-300 w-full h-screen flex">
                <div className="bg-loginBackgroundColor h-full w-1/2 lg:ml-36">
                    <div className="">
                        <h1 className="pt-5 text-white text-6xl font-bold font-mono tracking-widest flex justify-end">
                            HOS
                        </h1>
                        <div className="bg-white w-96 h-80 ml-auto mt-10 shadow-md flex justify-center items-center">
                            <div className="px-20">
                                <h1 className="font-bold font-mono px-14 text-xl text-loginBackgroundColor">
                                    HOSPITAL
                                </h1>
                                <form
                                    onSubmit={handleSubmit}
                                    className="flex flex-col items-end"
                                >
                                    <input
                                        className="mb-2 h-5 border border-slate-300 rounded custom-input"
                                        type="text"
                                        name="email"
                                        placeholder="Email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                    <input
                                        className="h-5 border-slate-300 rounded custom-input"
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                    <Link
                                        to={"/doctors/doctorforgotpassword"}
                                        className="text-xs font-semibold hover:text-slate-500"
                                    >
                                        Forgot Password?
                                    </Link>
                                    <button
                                        type="submit"
                                        className="bg-loginBackgroundColor text-white text-sm p-1 w-52 mt-4 hover:bg-hoverLogin rounded"
                                    >
                                        Login
                                    </button>
                                    <Link
                                        to={"/doctors/doctorsignup"}
                                        type="button"
                                        className="text-xs font-semibold hover:text-slate-500 w-3/4 mt-5 "
                                    >
                                        Create Account
                                    </Link>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-slate-300 h-full w-2/4 pt-5">
                    <span className="text-6xl font-bold font-mono tracking-widest">
                        PITAL
                    </span>
                    <div className="bg-loginImage w-96 h-80 mt-10 shadow-md flex justify-center items-center">
                        <div className="px-20">
                            <img
                                src="https://freepngimg.com/save/11648-doctor-symbol-caduceus-png-clipart/400x376"
                                alt=""
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Doctorlogin
