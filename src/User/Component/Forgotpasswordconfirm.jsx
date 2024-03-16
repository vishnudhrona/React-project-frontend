import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import instance from '../../Axios/Axios';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Forgotpasswordconfirm = () => {

    const [formData, setFormData] = useState({
        otp: "",
        password: "",
    });
  const [timer, setTimer] = useState(60)
  const [disableResend, setDisableResend] = useState(false)
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    let interval;

    if(timer > 0 && disableResend) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1)
      }, 1000)
    } else {
      clearInterval(interval)
      setDisableResend(false)
      setTimer(60)
    }

    return () => clearInterval(interval)

  }, [timer, disableResend])

  const handleResend = () => {
  setDisableResend(true)
  instance.post('/resendotp',{userEmail})
}

    const { userEmail } = useParams();
    console.log(userEmail,'jjjjjjjjjjjjj');
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        try {
            const validationErrors = {};

            const numberRegex = /^[0-9]+(?:\.[0-9]+)?$/;

            if (!formData.otp) {
                validationErrors.otp = "OTP required";
            } else if (!numberRegex.test(formData.otp)) {
                validationErrors.otp = "Not a valid format"
            }

            if (formData.password.length < 6) {
                validationErrors.password = "Password must be at least 6 characters";
            }

            if (Object.keys(validationErrors).length > 0) {
                setFormErrors(validationErrors);
                return;
            }

            instance.post("/userforgotpasswordconfirm", {
                otp: formData.otp,
                password: formData.password,
                email: userEmail,
            }).then((data) => {
                if (data.data.response.status) {
                    navigate("/login");
                } else {
                    toast.error(data.data.error, {
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
            });
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
                                        className="mb-2 border-slate-300 rounded custom-input"
                                        type="text"
                                        name="otp"
                                        placeholder="OTP"
                                        value={formData.otp}
                                        onChange={handleChange}
                                    />
                                    {formErrors.otp && (
                                        <span className="text-red-500 text-xs">
                                            {formErrors.otp}
                                        </span>
                                    )}
                                    {disableResend ?
                                        <span>{timer}</span> :
                                        <button
                                            onClick={handleResend}
                                            className='text-xs'
                                        >
                                            Resend OTP
                                        </button>}
                                    <input
                                        className="border-slate-300 rounded custom-input"
                                        type="password"
                                        name="password"
                                        placeholder="New Password"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                    {formErrors.password && (
                                        <span className="text-red-500 text-xs">{formErrors.password}</span>
                                    )}
                                    <button
                                        type="submit"
                                        className="bg-loginBackgroundColor text-white text-sm p-1 w-52 mt-4 hover:bg-hoverLogin rounded"
                                    >
                                        submit
                                    </button>
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

export default Forgotpasswordconfirm
