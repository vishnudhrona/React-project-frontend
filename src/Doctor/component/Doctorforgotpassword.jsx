import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import instance from '../../Axios/Axios';

const Doctorforgotpassword = () => {
    const [formData, setFormData] = useState({
        email:""
      });
    const [formErrors, setFormErrors] = useState({});

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

            if (!formData.email) {
                validationErrors.email = "Invalid email address";
            } else if (!emailRegex.test(formData.email)) {
                validationErrors.email = "Email not in valid format"
            }

            if (Object.keys(validationErrors).length > 0) {
                setFormErrors(validationErrors);
                return;
            }

            instance.post('/doctors/doctorforgotpassword',{formData}).then((data) => {
                if(data.data.response.status) {
                    navigate(`/doctors/doctorforgotpasswordconfirm/${data.data.response.email}`)
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
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {formErrors.email && (
                                    <span className="text-red-500 text-xs">{formErrors.email}</span>
                                )}
                <button
                  type="submit"
                  className="bg-loginBackgroundColor text-white text-sm p-1 w-52 mt-4 hover:bg-hoverLogin rounded"
                >
                  Send OTP
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

export default Doctorforgotpassword
