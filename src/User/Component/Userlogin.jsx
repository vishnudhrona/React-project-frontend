import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import instance from '../../Axios/Axios';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { accessToken, patientId, name } from '../../Redux/Reducers/patientSlice';
import { useDispatch } from 'react-redux';

const Userlogin = () => {

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [formErrors, setFormErrors] = useState({});

    const dispatch = useDispatch()
    const navigate = useNavigate()


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

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
                console.log(response.data.auth,'login response');
                if (response.data.status === "unblock") {
                    localStorage.setItem("token", JSON.stringify(response.data.auth));
                    dispatch(accessToken(response.data.auth));
                    dispatch(patientId(response.data.user._id));
                    dispatch(name(response.data.user.name));
                    navigate("/");
                  } else if(response.data.status === 'nouser') {
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
        if(!accessToken) {
          navigate('/login')
        } else {
          navigate('/')
        } 
      },[navigate])

      const googleAuth = async() => {
        wlindow.open('http//:localhost:5173/google')
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
                                    <Link
                                        to={"/signup"}
                                        type="button"
                                        className="text-xs font-semibold hover:text-slate-500 w-3/4 mt-5 "
                                    >
                                        Create Account
                                    </Link>
                                </form>
                                <button
                                        className="text-sm p-1 w-52 mt-4 hover:bg-hoverLogin rounded border border-black"
                                        onClick={googleAuth}
                                    >
                                        <span>Sign In with Google</span>
                                    </button>
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


                                        // <img className='w-5' src="data:image/jpeg;base64,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" alt="" />
