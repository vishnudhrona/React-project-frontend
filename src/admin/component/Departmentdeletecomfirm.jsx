import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { departmentConfirmDelete } from '../../Redux/Reducers/adminSlice'
import instance from '../../Axios/Axios'

const Departmentdeletecomfirm = () => {

    const dispatch = useDispatch()

    const departmentId = useSelector((state) => state.adminData.departmentId)
    console.log(departmentId,'uuuuuuuuuuuuuuuuuu');

    const cancelDelete = () => {
        dispatch(departmentConfirmDelete(false))
    }

    const departmentDelete = () => {
        try {
            instance.post('/admin/deletedepartment',{departmentId}).then((response) => {
                if(response) {
                    dispatch(departmentConfirmDelete(false))
                }
            })
        } catch(err) {
            console.error(err);
        }
    }
  return (
    <>
    <div className='fixed inset-0 flex items-center justify-center'>
    <div className="relative p-4 w-full max-w-md h-full md:h-auto">
      {/* Modal content */}
      <div className="relative p-4 text-center deleteConfirm-overlay rounded-lg shadow dark:bg-red-800 sm:p-5">
        <svg
          className="text-red-600 dark:text-red-500 w-11 h-11 mb-3.5 mx-auto"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
        <p className="mb-4 text-white dark:text-gray-300">
          Are you sure you want to delete this Department?
        </p>
        <div className="flex justify-center items-center space-x-4">
          <button
            data-modal-toggle="deleteModal"
            type="button"
            className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            onClick={cancelDelete}
          >
            No, cancel
          </button>
          <button
            type="submit"
            className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
            onClick={departmentDelete}
          >
            Yes, I'm sure
          </button>
        </div>
      </div>
    </div>
    </div>

</>
  )
}

export default Departmentdeletecomfirm
