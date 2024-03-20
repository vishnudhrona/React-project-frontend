import React, { useState } from 'react'
import instance from '../../Axios/Axios';
import { useDispatch } from 'react-redux';
import { deparmentFormClose } from '../../Redux/Reducers/adminSlice';

const Adddepartmentform = () => {
    const [formData, setFormData] = useState({
        department: "",
    });
    const [formErrors, setFormErrors] = useState({});

    const dispatch = useDispatch()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const formClose = () => {
        dispatch(deparmentFormClose(false))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        try {
            const validationErrors = {};

            if (!formData.department) {
                validationErrors.department = "Deparment is required";
            }

            if (Object.keys(validationErrors).length > 0) {
                setFormErrors(validationErrors);
                return;
            }

            instance.post('/admin/adddepartment',{formData}).then((response) => {
                if(response.data.response.status) {
                    dispatch(deparmentFormClose(false))
                }
            })
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <>
            <div className="doctor-schedule-time-container timeschedule-overlay py-5 px-5">
                <form
                    onSubmit={handleSubmit}
                >
                    <div className="flex gap-4">
                        <div className="flex flex-col">
                            <h1 className="">Department</h1>
                            <div className="relative">
                                <input
                                    type='text'
                                    name="department"
                                    placeholder='Deparment'
                                    value={formData.department}
                                    onChange={handleChange}
                                />
                            </div>
                            {formErrors.department && (
                                <span className="text-red-500 text-xs">{formErrors.department}</span>
                            )}
                        </div>
                    </div>
                    <div className="pt-5 flex justify-center item-center gap-4">
                        <button className="bg-buttonColor hover:bg-green-500 text-white px-1 py-1 w-1/2" type="submit">
                            Submit
                        </button>
                        <button
                            onClick={formClose}
                            className="bg-red-500 hover:bg-red-600 text-white px-1 py-1 w-1/2" type="submit"
                        >
                            Clsoe
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Adddepartmentform
