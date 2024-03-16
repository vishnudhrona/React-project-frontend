import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import instance from '../../Axios/Axios';
import { useSelector } from 'react-redux';

const Prescription = () => {
    const [formData, setFormData] = useState({})
    const [formErrors, setFormErrors] = useState({});

    const location = useLocation();
    const urlParams = new URLSearchParams(location.search);
    const patientId = urlParams.get("patientId")

    const navigate = useNavigate()

    const doctorId = useSelector((state) => state.doctorData.doctorId)
    console.log(doctorId,'i got doctor idddddd');

    useEffect(() => {
        instance.get(`/doctors/fetchpatientdetails?patientId=${patientId}`).then((response) => {
            setFormData(response.data.response)
        })
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
      };

      const handleSubmit = (e) => {
        e.preventDefault()
        try {
            const validationErrors = {};

            const nameRegex = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;

            if (!formData.patientfirstname) {
                validationErrors.patientfirstname = "First name is required";
            } else if (!nameRegex.test(formData.patientfirstname)) {
                validationErrors.patientfirstnamefirstname = "Name not in valid format"
            }

            if (!formData.lastName) {
                validationErrors.lastName = "Last name is required";
            } else if (!nameRegex.test(formData.lastName)) {
                validationErrors.lastName = "Name not in valid format"
            }

            if (!formData.gender) {
                validationErrors.gender = "Gender is required";
            } else if(!nameRegex.test(formData.gender)) {
                validationErrors.gender = "Enter only your gender"
            }

            if(!formData.dob) {
                validationErrors.dob = "Dob is required"
            } 

            if(!formData.description) {
                validationErrors.description = "Description is required"
            }

            if (Object.keys(validationErrors).length > 0) {
                setFormErrors(validationErrors);
                return;
            }

            instance.post('/doctors/addprescription',{ formData, patientId, doctorId }).then((response) => {
                if(response.data.status.status) {
                    navigate('/doctors/doctorhome')
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
                    backgroundImage: `url(${'https://c4.wallpaperflare.com/wallpaper/679/351/670/soft-gradient-solid-color-gradient-hd-wallpaper-preview.jpg'})`, // Set the background image
                    backgroundSize: 'cover', // Adjust background size as needed
                    backgroundPosition: 'center', // Adjust background position as needed
                    minHeight: '100vh' // Ensure the background covers the entire viewport
                }}
            >
                <div className="signup-overlay p-5 rounded shadow-md w-80">
                    <h2 className="text-2xl font-semibold mb-4">Add Prescription</h2>
                    <form
                    onSubmit={handleSubmit}
                    >
                        <div className="flex gap-4 mb-4">
                            <div>
                                <input
                                    type="text"
                                    name="patientfirstname"
                                    placeholder="First Name"
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
                                    type="text"
                                    name="dob"
                                    placeholder="Dob"
                                    className="w-full p-2 border rounded"
                                value={formData.dob}
                                onChange={handleChange}
                                />
                                {formErrors.dob && (
                            <span className="text-red-500 text-xs">{formErrors.gender}</span>
                        )}
                            </div>


                        </div>
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="description"
                            >
                                Description:
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                rows="4"
                                placeholder="Enter your description"
                            value={formData.description}
                            onChange={handleChange}
                            />
                            {formErrors.description && (<span className="text-red-500 text-xs">{formErrors.description}</span>)}
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

export default Prescription
