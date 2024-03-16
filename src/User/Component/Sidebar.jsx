import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import instance from '../../Axios/Axios';
import { setSortedDoc } from '../../Redux/Reducers/patientSlice';

const Sidebar = () => {
    const [selectedOption, setSelectedOption] = useState([]);
    const [speciality, setSpeciality] = useState([])

    const dispatch = useDispatch()

    useEffect(() => {
        try {
            instance.get('/admin/fetchdepartment').then((response) => {
                setSpeciality(response.data.department || [])
            })
        } catch (err) {
            console.error(err);
        }
    }, [])

    useEffect(() => {
        instance.post('/sortdoctor',{selectedOption}).then((sortedDoc) => {
          dispatch(setSortedDoc(sortedDoc.data.sortedDoc))
        })
      },[selectedOption,dispatch])

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value)
    }

    const unselectOption = () => {
        setSelectedOption([]); // Set selectedOption to an empty string
    };

  return (
    <>
    <aside className=" w-64 text-black">
      <div className="flex gap-12 p-4">
        <h6 className="text-sm">FILTERS</h6>
        <button
          className="text-sm hover:text-slate-500"
          onClick={unselectOption}
        >
          Clear All
        </button>
      </div>
      <div className="px-5">
        <h6 className="text-xs pb-3">SPECIALITY</h6>
        <div className="h-72 overflow-auto">
        {speciality.map((dep, index) => (
          <>
          <div key={index}>
            <label className="gap-4 text-xs font-mono">
              <input
                type="radio"
                value={dep.department}
                checked={selectedOption === dep.department}
                onChange={handleOptionChange}
                key={index}
                className="h-3 w-3 appearance-none checked:bg-slate-600 checked:border-transparent border border-gray-400 rounded-none mr-2"
              />
              {dep.department}
            </label>
          </div>
          </>
        ))}
        </div>
      </div>
    </aside>
  </>
  )
}

export default Sidebar
