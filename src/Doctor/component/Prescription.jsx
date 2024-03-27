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
    const bookingId = urlParams.get("bookingId")

    const navigate = useNavigate()

    const doctorId = useSelector((state) => state.doctorData.doctorId)

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
            const numberRegex = /^-?\d*\.?\d+$/;

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
            } else if (!nameRegex.test(formData.gender)) {
                validationErrors.gender = "Enter only your gender"
            }

            if (!formData.dob) {
                validationErrors.dob = "Dob is required"
            }

            if (!formData.disease) {
                validationErrors.disease = "Disease is required"
            }

            if (!formData.test) {
                validationErrors.test = "Test is required"
            }

            if (!formData.age) {
                validationErrors.age = 'Age is required'
            } else if (!numberRegex.test(formData.age)) {
                validationErrors.age = "Enter numerical value"
            }

            if (!formData.medicine) {
                validationErrors.medicine = "Medicine is required"
            }

            if (Object.keys(validationErrors).length > 0) {
                setFormErrors(validationErrors);
                return;
            }

            instance.post('/doctors/addprescription', { formData, patientId, doctorId, bookingId }).then((response) => {
                if (response.data.status.status) {
                    navigate('/doctors/patientbookingdetails')
                }
            })
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
<div className="flex justify-center items-center py-10"
                style={{
                    backgroundImage: `url(${'https://c4.wallpaperflare.com/wallpaper/679/351/670/soft-gradient-solid-color-gradient-hd-wallpaper-preview.jpg'})`, // Set the background image
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    minHeight: '100vh'
                }}
            >
                <div className="signup-overlay p-5 rounded shadow-md px-10">
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
                                    type="text"
                                    name="dob"
                                    placeholder="Dob"
                                    className="w-full p-2 border rounded"
                                    value={formData.dob}
                                    onChange={handleChange}
                                />
                                {formErrors.dob && (
                                    <span className="text-red-500 text-xs">{formErrors.dob}</span>
                                )}
                            </div>

                            <div>
                                <input
                                    type="text"
                                    name="disease"
                                    placeholder="Disease"
                                    className="w-full border rounded "
                                    value={formData.disease}
                                    onChange={handleChange}
                                />
                                {formErrors.disease && (
                                    <span className="text-red-500 text-xs">
                                        {formErrors.disease}
                                    </span>
                                )}
                            </div>

                            <div>
                                <input
                                    type="text"
                                    name="age"
                                    placeholder="Age"
                                    className="w-full p-2 border rounded"
                                    value={formData.age}
                                    onChange={handleChange}
                                />
                                {formErrors.age && (
                                    <span className="text-red-500 text-xs">{formErrors.age}</span>
                                )}
                            </div>
                        </div>

                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="description"
                            >
                                Medicines:
                            </label>
                            <textarea
                                id="description"
                                name="medicine"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                rows="4"
                                placeholder="Write each medicines line by line"
                                value={formData.medicine}
                                onChange={handleChange}
                            />
                            {formErrors.medicine && (<span className="text-red-500 text-xs">{formErrors.medicine}</span>)}

                            {formData.medicine && (
                                <ul className="list-disc pl-5">
                                    {formData.medicine.split('\n').map((medicine, index) => (
                                        <li key={index}>{medicine}</li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="description"
                            >
                                Test:
                            </label>
                            <textarea
                                id="test"
                                name="test"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                rows="4"
                                placeholder="Test"
                                value={formData.test}
                                onChange={handleChange}
                            />
                            {formErrors.test && (<span className="text-red-500 text-xs">{formErrors.test}</span>)}
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
