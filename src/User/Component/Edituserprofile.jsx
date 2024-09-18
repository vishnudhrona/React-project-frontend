import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import instance from '../../Axios/Axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Edituserprofile = () => {
    const initialValues = { patientfirstname: "", lastName: "", gender: "", number: "", email: "", password: "" }
    const [formData, setFormData] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [dob, setDob] = useState(null)

    console.log(dob,'rrrrrrrrrrrr');

    const { patientId } = useParams()
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleDate = (dob) => {
        setDob(dob)
    }

     useEffect(() => {
        instance.get(`/fetchuserDetails?patientId=${patientId}`).then((response) => {
            console.log(response,'edit profile responseeee');
            const dateString = response.data.response.dateOfBirth
            const parts = dateString.split('/');
            const formattedDate = `${parts[1]}/${parts[0]}/${parts[2]}`;

            const body = {
                patientfirstname : response.data.response.patientfirstname,
                lastName : response.data.response.lastName,
                dateOfBirth : new Date(formattedDate),
                gender : response.data.response.gender,
                email : response.data.response.email,
                number : response.data.response.number
            }
            setFormData(body)
            setDob(formattedDate)
        })
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

            instance.post('/updatepatientdata',{formData, dob}).then((response) => {
                if(response) {
                    navigate('/userprofile')
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
            <form 
            onSubmit={handleSubmit} 
            >
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
                </div>
                <div className="flex gap-4 mb-4">
                          <div>
                              <DatePicker
                                  className="p-2 border rounded datepicker-input"
                                //   selected={dob}
                                  name="date"
                                  onChange={handleDate}
                                //   value={dob}
                                  dateFormat="dd/MM/yyyy"
                                  placeholderText='Date of Birth'
                              />
                              {formErrors.dob && (
                                  <span className="text-red-500 text-xs">{formErrors.dob}</span>
                              )}
                          </div>
                    <div className='mb-5'>
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

                <button
                    type="submit"
                    className="w-full bg-buttonColor text-white p-2 rounded hover:bg-buttonColor"
                >
                    Submit
                </button>
            </form>
        </div>
    </div>
</>
  )
}

export default Edituserprofile
