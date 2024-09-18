import React, { useEffect, useState } from 'react'
import instance from '../../Axios/Axios'

const Doctors = () => {
  const [doctorDetails, setDoctorDetails] = useState([])
  const [doctorImage, setDoctorImage] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [doctorsPerPage] = useState(4);

  // console.log(doctorImage,'uuuuuuuuuuuuuuuuuuuuuuu');

  useEffect(() => {
    instance.get(`/landingpagefetchDoctors`).then((doctors) => {
      console.log(doctors.data.doctorsDetails.image,'uuuuuuuuuuuuuuuuuuuuuuu');
      setDoctorDetails(doctors.data.doctorsDetails.details)
      setDoctorImage(doctors.data.doctorsDetails.image)
    })
  }, [])

  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = doctorDetails.slice(indexOfFirstDoctor, indexOfLastDoctor);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const findIndexOf = (doctor) => {
    return doctorDetails.findIndex((doc) => doc.doctorId === doctor.doctorId);
};

  return (
    <>
    {doctorImage.map((img, index) => (
      <>
      <h1>{img}</h1>
    <img key={index} src={img} alt="" />
    </>
    ))}
    <div className="bg-blue-200 p-5">
      <div className="container-fluid mx-auto p-10">
      <h1 className="text-4xl font-bold mb-4 text-blue-900">
      Our Doctors
        </h1>
        <p className="text-xs text-blue-900">
        We have some of the best specialty doctors from around the world, they bring years of experience and offer evidence based treatment 
        </p>
        <p className="text-xs text-blue-900 ">to ensure the best care for you.</p>
        <div className='flex py-5 gap-4 '>
        {currentDoctors.map((doctor, index) => (
          <>
          <div 
          key={index} 
          className=" w-60 border border-slate-400 rounded overflow-hidden shadow-lg">
          <img
            className="w-full"
            src={doctorImage[findIndexOf(doctor)]}
            alt="Sunset in the mountains"
          />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2 text-blue-900">
                {doctor.firstname} {doctor.lastname}
                </div>
            <p className="text-blue-900 text-base">
            Senior Consultant & Head of Neurosurgery
            </p>
          </div>
        </div>
        </>
        ))} 
        </div>

        <ul className="flex justify-center">
            {Array.from({ length: Math.ceil(doctorDetails.length / doctorsPerPage) }).map((_, index) => (
              <li key={index}>
                <button
                  className="px-3 py-1 mr-2 rounded bg-blue-500 text-white"
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        
        
      </div>
    </div>
  </>
  )
}

export default Doctors
