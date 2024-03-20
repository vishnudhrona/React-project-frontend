import React, { useEffect, useState } from 'react'
import { departmentEditForm } from '../../Redux/Reducers/adminSlice'
import { useDispatch, useSelector } from 'react-redux'
import instance from '../../Axios/Axios'

const Editdepartmentform = () => {
    const [department, setDepartment] = useState({})

    const dispatch = useDispatch()

    const departmentId = useSelector((state) => state.adminData.departmentId)

    const formClose = () => {
        dispatch(departmentEditForm(false))
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDepartment((prevData) => ({ ...prevData, [name]: value }));
    };

    useEffect(() => {
        try {
            instance.post('/admin/fetcheditdepartment',{ departmentId }).then((response) => {
                setDepartment(response.data.department)
            })
        } catch(err) {
            console.error(err);
        }
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        try {
            instance.post('/admin/updatedepartment',{ department }).then((response) => {
                if(response) {
                    dispatch(departmentEditForm(false))
                }
            })
        } catch(err) {
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
                            value={department.department}
                            onChange={handleChange}
                        />
                    </div>
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

export default Editdepartmentform
