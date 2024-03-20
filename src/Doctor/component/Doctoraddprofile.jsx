import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import instance from '../../Axios/Axios';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Doctoraddprofile = () => {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        department: '',
        gender: '',
        number: '',
        email: '',
        house: '',
        village: '',
        city: '',
        year: '',
        degree: '',
        college: '',
        experiencedyear: '',
        workeddepartment: '',
        position: '',
        hospital: '',
        description: '',
        fee: ''
    });
    const [file, setFile] = useState()
    const [formErrors, setFormErrors] = useState({});
    const [department, setDepartment] = useState([])

    const navigate = useNavigate()
    const doctorId = useSelector((state) => state.doctorData.doctorId)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    useEffect(() => {
        try {
            instance.get('/admin/fetchdepartment').then((response) => {
                setDepartment(response.data.department || [])
            })
        } catch (err) {
            console.error(err);
        }
    }, [])

    const submit = async (e) => {
        e.preventDefault()
        try {
            const validationErrors = {};

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const nameRegex = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;
            const numberRegex = /^[0-9]+(?:\.[0-9]+)?$/;


            if (!formData.email.includes("@")) {
                validationErrors.email = "Invalid email address";
            } else if (!emailRegex.test(formData.email)) {
                validationErrors.email = "Email not in valid format"
            }

            if (!formData.firstname) {
                validationErrors.firstname = "First name is required";
            } else if (!nameRegex.test(formData.firstname)) {
                validationErrors.firstname = "Name not in valid format"
            }

            if (!formData.lastname) {
                validationErrors.lastname = "Last name is required";
            } else if (!nameRegex.test(formData.lastname)) {
                validationErrors.lastname = "Name not in valid format"
            }

            if (!formData.department) {
                validationErrors.department = "Department is required";
            } else if (!nameRegex.test(formData.department)) {
                validationErrors.department = 'Department is required'
            }

            if (!formData.gender) {
                validationErrors.gender = "Gender is required";
            } else if (!nameRegex.test(formData.gender)) {
                validationErrors.gender = "Enter only your gender"
            }

            if (!formData.number) {
                validationErrors.number = "Number is required";
            } else if (!numberRegex.test(formData.number)) {
                validationErrors.number = "Invalid format"
            }

            if (!formData.house) {
                validationErrors.house = "House is required"
            }

            if (!formData.village) {
                validationErrors.village = "Village is required"
            }

            if (!formData.city) {
                validationErrors.city = "City is required"
            }

            if (!formData.year) {
                validationErrors.year = "Year is required"
            } else if (!numberRegex.test(formData.year)) {
                validationErrors.year = "Enter numerical value"
            }

            if (!formData.degree) {
                validationErrors.degree = "Degree is required"
            }

            if (!formData.college) {
                validationErrors.college = "College is required"
            }

            if (!formData.experiencedyear) {
                validationErrors.experiencedyear = "Experienced year is required"
            } else if (!numberRegex.test(formData.experiencedyear)) {
                validationErrors.experiencedyear = "Enter numerical value"
            }

            if (!formData.workeddepartment) {
                validationErrors.workeddepartment = "Worked department is required"
            }

            if (!formData.position) {
                validationErrors.position = "Position is required"
            } else if (!nameRegex.test(formData.position)) {
                validationErrors.position = "Enter invalid key"
            }

            if (!formData.hospital) {
                validationErrors.hospital = "Hospital is required"
            }

            if (!formData.description) {
                validationErrors.description = "Description is required"
            }

            if (!formData.fee) {
                validationErrors.fee = "Fee is required"
            } else if (!numberRegex.test(formData.fee)) {
                validationErrors.fee = "Enter numerical value"
            }

            if (!file) {
                validationErrors.file = "Select your Profile image"
            }

            if (Object.keys(validationErrors).length > 0) {
                setFormErrors(validationErrors);
                return;
            }

            const formDataToSend = new FormData()
            formDataToSend.append('image', file)

            formDataToSend.append('doctorId', doctorId);

            Object.keys(formData).forEach((key) => {
                formDataToSend.append(key, formData[key]);
            });

            await instance.post('/doctors/uploadprofile', formDataToSend, { headers: { 'Content-Type': 'multipart/form-data' } }).then((response) => {
                if (response.data.status) {
                    toast.success('Sign up is successful You will get a verification Mail on your email Id Thank you', {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                        transition: Zoom,
                    });
                    setTimeout(() => {
                        navigate('/doctors/doctorlogin')
                    }, 6000)
                } else {
                    toast.error('Failed to sign Up try again', {
                        position: "top-center",
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
            <div className="" style={{
                backgroundImage: `url(${'https://c4.wallpaperflare.com/wallpaper/686/903/613/soft-gradient-solid-color-gradient-hd-wallpaper-preview.jpg'})`, // Set the background image
                backgroundSize: 'cover',
                backgroundPosition: 'center', 
                minHeight: '100vh' 
            }}>
                <div className="flex justify-center py-5">
                </div>
                <div className="flex justify-center items-center pb-5 ">
                    <div className="signup-overlayrounded shadow-md p-5">
                        <h2 className="text-2xl font-semibold mb-4">Add your details</h2>
                        <form
                            encType="multipart/form-data"
                            onSubmit={submit}
                        >
                            <div className="flex items-center justify-items-center mb-4 gap-7">
                                <div className="flex flex-col w-full">
                                    <input
                                        type="text"
                                        name="firstname"
                                        placeholder="First Name"
                                        className="w-full p-2 border rounded"
                                        value={formData.firstname}
                                        onChange={handleChange}
                                    />
                                    {formErrors.firstname && (<span className="text-red-500 text-xs">{formErrors.firstname}</span>)}
                                </div>

                                <div className="flex flex-col w-full">
                                    <input
                                        type="text"
                                        name="lastname"
                                        placeholder="Last Name"
                                        className="w-full p-2 border rounded"
                                        value={formData.lastname}
                                        onChange={handleChange}
                                    />
                                    {formErrors.lastname && (<span className="text-red-500 text-xs">{formErrors.lastname}</span>)}
                                </div>
                                <div className="flex flex-col w-full">
                                    <select
                                        name="department"
                                        className="w-full p-2 border rounded"
                                        value={formData.department}
                                        onChange={handleChange}
                                    >
                                    <option value="">Select Department</option>
                                    {department && department.map((dep, index) => (
                                        <>
                                    <option key={index} value={dep.department}>{dep.department}</option>
                                    </>
                                    ))}
                                    </select>
                                    {formErrors.department && (<span className="text-red-500 text-xs">{formErrors.department}</span>)}
                                </div>
                            </div>

                            <div className="flex items-center justify-center mb-4 gap-7">

                                <div className="flex flex-col w-full">
                                    <input
                                        type="text"
                                        name="gender"
                                        placeholder="Gender"
                                        className="w-full p-2 border rounded"
                                        value={formData.gender}
                                        onChange={handleChange}
                                    />
                                    {formErrors.gender && (<span className="text-red-500 text-xs">{formErrors.gender}</span>)}
                                </div>

                                <div className="flex flex-col w-full">
                                    <input
                                        type="text"
                                        name="number"
                                        placeholder="Number"
                                        className="w-full p-2 border rounded"
                                        value={formData.number}
                                        onChange={handleChange}
                                    />
                                    {formErrors.number && (<span className="text-red-500 text-xs">{formErrors.number}</span>)}
                                </div>
                                <div className="flex flex-col w-full">
                                    <input
                                        type="text"
                                        name="email"
                                        placeholder="Email"
                                        className="w-full p-2 border rounded"
                                        autoComplete='email'
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                    {formErrors.email && (<span className="text-red-500 text-xs">{formErrors.email}</span>)}
                                </div>
                            </div>

                            <div className="flex items-center justify-items-center mb-4 gap-7">
                                <div className="flex flex-col w-full">
                                    <input
                                        type="text"
                                        name="house"
                                        placeholder="House No."
                                        className="w-full p-2 border rounded"
                                        value={formData.house}
                                        onChange={handleChange}
                                    />
                                    {formErrors.house && (<span className="text-red-500 text-xs">{formErrors.house}</span>)}
                                </div>

                                <div className="flex flex-col w-full">
                                    <input
                                        type="text"
                                        name="village"
                                        placeholder="Village"
                                        className="w-full p-2 border rounded"
                                        value={formData.village}
                                        onChange={handleChange}
                                    />
                                    {formErrors.village && (<span className="text-red-500 text-xs">{formErrors.village}</span>)}
                                </div>
                                <div className="flex flex-col w-full">
                                    <input
                                        type="text"
                                        name="city"
                                        placeholder="City"
                                        className="w-full p-2 border rounded"
                                        value={formData.city}
                                        onChange={handleChange}
                                    />
                                    {formErrors.village && (<span className="text-red-500 text-xs">{formErrors.village}</span>)}
                                </div>
                            </div>

                            <h1 className="mb-2">Education :</h1>

                            <div className="flex items-center justify-items-center mb-4 gap-7">
                                <div className="flex flex-col w-full">
                                    <input
                                        type="text"
                                        name="year"
                                        placeholder="Year"
                                        className="w-full p-2 border rounded"
                                        value={formData.year}
                                        onChange={handleChange}
                                    />
                                    {formErrors.year && (<span className="text-red-500 text-xs">{formErrors.year}</span>)}
                                </div>

                                <div className="flex flex-col w-full">
                                    <input
                                        type="text"
                                        name="degree"
                                        placeholder="Degree"
                                        className="w-full p-2 border rounded"
                                        value={formData.degree}
                                        onChange={handleChange}
                                    />
                                    {formErrors.degree && (<span className="text-red-500 text-xs">{formErrors.degree}</span>)}
                                </div>

                                <div className="flex flex-col w-full">
                                    <input
                                        type="text"
                                        name="college"
                                        placeholder="College"
                                        className="w-full p-2 border rounded"
                                        value={formData.college}
                                        onChange={handleChange}
                                    />
                                    {formErrors.college && (<span className="text-red-500 text-xs">{formErrors.college}</span>)}
                                </div>
                            </div>
                            <h1 className="mb-2">Experience :</h1>

                            <div className="flex items-center justify-items-center mb-4 gap-7">

                                <div className="flex flex-col w-full">
                                    <input
                                        type="text"
                                        name="experiencedyear"
                                        placeholder="Year"
                                        className="w-full p-2 border rounded"
                                        value={formData.experiencedyear}
                                        onChange={handleChange}
                                    />
                                    {formErrors.experiencedyear && (<span className="text-red-500 text-xs">{formErrors.experiencedyear}</span>)}
                                </div>

                                <div className="flex flex-col w-full">
                                    <input
                                        type="text"
                                        name="workeddepartment"
                                        placeholder="Department"
                                        className="w-full p-2 border rounded"
                                        value={formData.workeddepartment}
                                        onChange={handleChange}
                                    />
                                    {formErrors.workeddepartment && (<span className="text-red-500 text-xs">{formErrors.workeddepartment}</span>)}
                                </div>

                                <div className="flex flex-col w-full">
                                    <input
                                        type="text"
                                        name="position"
                                        placeholder="Position"
                                        className="w-full p-2 border rounded"
                                        value={formData.position}
                                        onChange={handleChange}
                                    />
                                    {formErrors.position && (<span className="text-red-500 text-xs">{formErrors.position}</span>)}
                                </div>

                                <div className="flex flex-col w-full">
                                    <input
                                        type="text"
                                        name="hospital"
                                        placeholder="Hospital"
                                        className="w-full p-2 border rounded"
                                        value={formData.hospital}
                                        onChange={handleChange}
                                    />
                                    {formErrors.hospital && (<span className="text-red-500 text-xs">{formErrors.hospital}</span>)}
                                </div>
                            </div>

                            <div className="flex items-center justify-items-center mb-4 gap-7">
                                <div className="flex flex-col w-full">
                                    <input
                                        type="file"
                                        name="doctorimage"
                                        placeholder="Image"
                                        className="w-full p-2 border rounded"
                                        accept="image/*"
                                        onChange={(e) => setFile(e.target.files[0])}
                                    />
                                    {formErrors.file && (<span className="text-red-500 text-xs">{formErrors.file}</span>)}
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

                            <h6 className='text-gray-700 text-sm font-bold mb-2'>Consultation Fee</h6>
                            <div className="flex items-center justify-items-center mb-4 gap-7">
                                <div className="flex flex-col w-full">
                                    <input
                                        type="text"
                                        name="fee"
                                        placeholder="Consultation Fee"
                                        className="w-full p-2 border rounded"
                                        value={formData.fee}
                                        onChange={handleChange}
                                    />
                                    {formErrors.fee && (<span className="text-red-500 text-xs">{formErrors.fee}</span>)}
                                </div>

                            </div>
                            <button
                                type="submit"
                                className="w-full bg-buttonColor text-white p-2 mb-2 rounded hover:bg-buttonColor"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Doctoraddprofile
