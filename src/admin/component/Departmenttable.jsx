import React, { useEffect, useState } from 'react'
import Adddepartmentform from './Adddepartmentform'
import { deparmentFormClose, departmentConfirmDelete } from '../../Redux/Reducers/adminSlice'
import { useDispatch, useSelector } from 'react-redux'
import instance from '../../Axios/Axios'
import { departmentId } from '../../Redux/Reducers/adminSlice'
import Departmentdeletecomfirm from './Departmentdeletecomfirm'
import { departmentEditForm } from '../../Redux/Reducers/adminSlice'
import Editdepartmentform from './Editdepartmentform'
import { TbPlayerTrackNextFilled, TbPlayerTrackPrevFilled } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'

const Departmenttable = () => {
    const [departmentForm, setDepartmentForm] = useState(false)
    const [department, setDepartment] = useState([])
    const [confirmDelete, setConfirmDelete] = useState(false)
    const [editDepartmentForm, setEditDepartmentForm] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const [doctorsPerPage] = useState(5);

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const formClose = useSelector((state) => state.adminData.deparmentFormClose)
    const confirm = useSelector((state) => state.adminData.departmentConfirmDelete)
    const editFormClose = useSelector((state) => state.adminData.departmentEditForm)

    const indexOfLastDoctor = currentPage * doctorsPerPage;
    const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
    let currentDepartment
    department && (
         currentDepartment = department.slice(indexOfFirstDoctor, indexOfLastDoctor)
        )

    const paginate = (pageNumber) => setCurrentPage(pageNumber);


    const toggleScheduleForm = () => {
        setDepartmentForm(true)
        dispatch(deparmentFormClose(true))
    }

    const deleteDepartment = (depId) => {
        setConfirmDelete(true)
        dispatch(departmentId(depId))
        dispatch(departmentConfirmDelete(true))
    }

    const editForm = (id) => {
        setEditDepartmentForm(true)
        dispatch(departmentId(id))
        dispatch(departmentEditForm(true))
    }

    useEffect(() => {
        let accessToken = localStorage.getItem('adminToken')
        if(!accessToken) {
          navigate('/admin/adminlogin')
        }
      })

    useEffect(() => {
        try {
            instance.get('/admin/fetchdepartment').then((response) => {
                setDepartment(response.data.department || [])
            })
        } catch (err) {
            console.error(err);
        }
    }, [confirm, formClose, editFormClose])

  return (
    <>
    <div className='relative'>
        <button
            className="border bg-buttonColor text-white px-5 py-1 rounded mt-5 mb-5"
            onClick={toggleScheduleForm}
        >
            Add Department
        </button>
        <div className='absolute'>
            {departmentForm && formClose && (
                <Adddepartmentform />
            )}
        </div>
        <div className='absolute'>
            {confirmDelete && confirm && (
                <Departmentdeletecomfirm />
            )}
        </div>
        <div className='absolute'>
            {editDepartmentForm && editFormClose && (
                <Editdepartmentform />
            )}
        </div>
        <div className="flex items-center justify-center">
            <table className=" text-sm text-left text-gray-500 dark:text-gray-400 border border-gray-300">
                <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            No.
                        </th>
                        <th scope="col" className="px-6 py-3">
                           Department
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {department && currentDepartment.map((dep, index) => (
                        <>
                            <tr
                                className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                                key={index}
                            >
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                    {index + 1}
                                </th>
                                <td
                                    scope="row"
                                    className="px-6 py-4"
                                >
                                    {dep.department}
                                </td>
                                <td className="px-6 py-4">
                                    <button
                                      className="font-medium text-red-600 dark:text-blue-500 hover:underline"
                                      onClick={() => deleteDepartment(dep._id)}
                                    >
                                        Delete
                                    </button>
                                    /
                                    <button
                                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                      onClick={() => editForm(dep._id)}
                                    >
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        </>
                      ))}
                </tbody>
            </table>
        </div>
        </div>

        <div className="flex justify-center mt-4">
                <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="mr-2 bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded"
                >
                   <TbPlayerTrackPrevFilled />
                </button>
                
                  {
                      Array.from({ length: Math.ceil(department.length / doctorsPerPage) }).map((_, index) => (
                          <button
                              key={index}
                              onClick={() => paginate(index + 1)}
                              className={`mx-1 px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-customColor text-white' : 'bg-gray-200 hover:bg-gray-300'
                                  }`}
                          >
                              {index + 1}
                          </button>
                      ))
                  }
                
                <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === Math.ceil(department.length / doctorsPerPage)}
                    className="ml-2 bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded"
                >
                    <TbPlayerTrackNextFilled />
                </button>
            </div>
        </>
  )
}

export default Departmenttable
