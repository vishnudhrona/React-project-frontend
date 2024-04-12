import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import instance from '../../Axios/Axios';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { accessToken, patientId, name } from '../../Redux/Reducers/patientSlice';
import { useDispatch } from 'react-redux';
import { useGoogleLogin } from '@react-oauth/google';
import { FcGoogle } from 'react-icons/fc';

const Userlogin = () => {

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [formErrors, setFormErrors] = useState({});

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    
    const videoCallPeerId = localStorage.getItem('peerId')

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const login = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
           try {
            await instance.post('/usergoogleauthentication',{tokenResponse}).then((response) => {
                console.log(response.data,'auth response data');
                if(response.data.status && !videoCallPeerId) {
                    localStorage.setItem('token',response.data.token)
                    dispatch(patientId(response.data.existingUser._id))
                    dispatch(name(response.data.existingUser.patientfirstname))
                    navigate('/')
                } else if(response.data.status && videoCallPeerId) {
                    localStorage.setItem('token',response.data.token)
                    dispatch(patientId(response.data.existingUser._id))
                    dispatch(name(response.data.existingUser.patientfirstname))
                    navigate(`/doctors/remoteuservideo?peerId=${videoCallPeerId}`)
                } else {
                    const body = {
                        email : response.data.response.email,
                        patientfirstname : response.data.response.given_name,
                        lastName : response.data.response.family_name
                    }
                    const authDetails = JSON.stringify(body)
                    navigate(`/googleauthform?authcredential=${authDetails}`)
                }
            })
           } catch(err) {
            console.error(err);
           }
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault()
        try {
            const validationErrors = {};

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!formData.email.includes("@")) {
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

            instance.post("/userlogin", { formData }).then((response) => {
                if (response.data.status === "unblock" && !videoCallPeerId) {
                    localStorage.setItem("token", response.data.auth);
                    dispatch(accessToken(response.data.auth));
                    dispatch(patientId(response.data.user._id));
                    dispatch(name(response.data.user.name));
                    navigate("/");
                } else if(response.data.status === "unblock" && videoCallPeerId) {
                    localStorage.setItem("token", response.data.auth);
                    dispatch(accessToken(response.data.auth));
                    dispatch(patientId(response.data.user._id));
                    dispatch(name(response.data.user.name));
                    navigate(`/doctors/remoteuservideo?peerId=${videoCallPeerId}`)
                } else if (response.data.status === 'nouser') {
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

    useEffect(() => {
        const accessToken = localStorage.getItem('token')
        if (!accessToken) {
            navigate('/login')
        } else {
            navigate('/')
        }
    }, [navigate])


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
                                        value={formData.number}
                                        onChange={handleChange}
                                    />
                                    {formErrors.email && (
                                        <span className="text-red-500 text-xs">{formErrors.email}</span>
                                    )}
                                    <input
                                        className="h-5 border-slate-300 rounded custom-input"
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                    {formErrors.password && (
                                        <span className="text-red-500 text-xs">{formErrors.password}</span>
                                    )}
                                    <Link
                                        to={"/userforgotpassword"}
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
                                </form>
                                <div className="flex justify-center items-center mt-2">
                                    <Link
                                        to={"/signup"}
                                        type="button"
                                        className="text-xs font-semibold hover:text-slate-500 mt-2"
                                    >
                                        Create Account
                                    </Link>
                                </div>
                                <div className='flex justify-center mt-3'>
                                <button
                                onClick={() => login()}
                                className="bg-slate-200 text-xs p-2 rounded hover:bg-slate-400"
                                >
                                <div className='flex justify-between items-center gap-2'>
                                <span><FcGoogle /></span>
                                <span>Sign in with Google</span>
                                </div>
                            </button>

                                </div>
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
                                src="https://static.vecteezy.com/system/resources/thumbnails/021/809/795/small/doctors-day-illustration-png.png"
                                alt=""
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Userlogin


