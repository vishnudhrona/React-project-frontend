import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import instance from '../../Axios/Axios';
import { doctorId } from '../../Redux/Reducers/doctorSlice';
import { useDispatch } from 'react-redux';

const Doctorotplogin = () => {
    const [formData, setFormData] = useState({ otp: "" });
    const [formErrors, setFormErrors] = useState({});

    const dispatch = useDispatch()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const { number } = useParams()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        try {
            const validationErrors = {}

            const numberRegex = /^[0-9]*$/;

            if (!formData.otp) {
                validationErrors.otp = "OTP is required";
            } else if (!numberRegex.test(formData.otp)) {
                validationErrors.otp = "Enter numerical values"
            }

            if (Object.keys(validationErrors).length > 0) {
                setFormErrors(validationErrors);
                return;
            }

            let otp = formData.otp
            instance.post('/doctors/docotpverification',{otp, number}).then((response) => {
                console.log(response,'hhhhhhhhhhhhhhhh');
                if(response.data.otpVerifiedStatus === 'approved') {
                    dispatch(doctorId(response.data.doc._id))
                    navigate('/doctors/doctoraddprofile')
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
                                        className="border-slate-300 rounded custom-input"
                                        type="text"
                                        name="otp"
                                        placeholder="Otp"
                                        value={formData.otp}
                                        onChange={handleChange}
                                    />
                                    {formErrors.otp && (
                                        <span className="text-red-500 text-xs">
                                            {formErrors.otp}
                                        </span>
                                    )}
                                    {/* {disableResend ? 
                          <span>{timer}</span> : 
                          <button 
                          onClick={handleResend} 
                          className='text-xs'
                          >
                            Resend OTP
                            </button>} */}
                                    <button
                                        type="submit"
                                        className="bg-loginBackgroundColor text-white text-sm p-1 w-52 mt-4 hover:bg-hoverLogin rounded"
                                    >
                                        Verify
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

export default Doctorotplogin
