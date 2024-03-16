import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import instance from "../../Axios/Axios";
import { useSelector } from "react-redux";
import { TbPlayerTrackNextFilled, TbPlayerTrackPrevFilled } from "react-icons/tb";

const Doctordetails = () => {
    const [doctorProfile, setDocProfile] = useState([]);
    const [image, setImage] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [filteredDoctorProfile, setFilteredDoctorProfile] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [doctorsPerPage] = useState(5);
  
    const sortDoc = useSelector((state) => state.patientData.sortedDoc.doctorDetails);
    const sortImg = useSelector((state) => state.patientData.sortedDoc.image);

    const indexOfLastDoctor = currentPage * doctorsPerPage;
    const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
    const profile = doctorProfile.slice(indexOfFirstDoctor, indexOfLastDoctor);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
    useEffect(() => {
      instance.post("/doctorbooking").then((docProfile) => {
        if (!sortDoc) {
          setDocProfile(docProfile.data.docProfile.doctorDetails);
          setFilteredDoctorProfile(docProfile.data.docProfile.doctorDetails);
          setImage(docProfile.data.docProfile.image);
        } else {
          setDocProfile(sortDoc);
          setImage(sortImg);
        }
      });
    }, [sortDoc, sortImg]);

    useEffect(() => {
        instance.post('/deletependingslots').then((response) => {
            console.log(response);
        })
    }, [])
  
    const searchDoctors = () => {
      const query = searchInput.toLowerCase();
      const filteredProfiles = doctorProfile.filter((doc) => {
        const fullName = `${doc.firstname} ${doc.lastname}`.toLowerCase();
        return fullName.includes(query);
      });
      setFilteredDoctorProfile(filteredProfiles);
    };

    const findIndexOf = (doctor) => {
        return doctorProfile.findIndex((doc) => doc.doctorId === doctor.doctorId);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      searchDoctors();
    };
  
    const searchDoc = (e) => {
        setSearchInput(e.target.value);
    };

    return (
        <>
            <div className="">
                <div className="pt-5">
                    <form className="flex items-center" onSubmit={handleSubmit}>
                        <label htmlFor="voice-search" className="sr-only">
                            Search
                        </label>
                        <div className="relative w-full">
                            <input
                                type="text"
                                id="voice-search"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Search Doctors"
                                required=""
                                onChange={searchDoc}
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 flex items-center pr-3"
                            >
                            </button>
                        </div>
                        <button
                            type="submit"
                            className="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-customColor rounded-lg border border-customColor hover:bg-buttonHov focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            <svg
                                className="w-4 h-4 mr-2"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                />
                            </svg>
                            Search
                        </button>
                    </form>
                </div>

                <div className="grid grid-rows">
                    <div className="max-w-sm w-full lg:max-w-full  p-5">
                        {filteredDoctorProfile.length > 0 && searchInput ? (



                            <>
                                {filteredDoctorProfile.map((doc, index) => (
                                    <div
                                        key={index}
                                        style={{
                                            borderBottom: "1px solid #ccc",
                                            marginBottom: "10px",
                                            padding: "10px",
                                        }}
                                    >
                                        <div className="flex">
                                            <div
                                                className="h-48 lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden mt-5"
                                                style={{ backgroundImage: `url(${image[findIndexOf(doc)]})` }}
                                                title="Woman holding a mug"
                                                key={index}
                                            ></div>

                                            <div className=" border-gray-400 lg:border-l-0  lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                                                <div className="mb-8">
                                                    <h1 className="text-doctorName font-bold text-xl mb-2">
                                                        {doc.firstname} {doc.lastname}
                                                    </h1>
                                                    <p className="text-gray-500 text-lg">
                                                        Position - {doc.position}
                                                    </p>
                                                    <p className="text-gray-500 text-lg">
                                                        Department - {doc.department}
                                                    </p>
                                                    <p className="text-gray-500 text-lg">
                                                        Consultant - Surgical & Gynaecological Oncology &
                                                        Robotic Surgeon, HIPEC &
                                                    </p>
                                                    <p className="text-gray-500 text-lg">
                                                        PIPAC Super-specialist
                                                    </p>
                                                    <p className="text-gray-500 text-lg">
                                                        Speciality - Surgical Oncology
                                                    </p>
                                                    <p className="text-gray-500 text-lg font-bold">
                                                        MBBS, MS, MCh(Onco), FRCS Edinburgh
                                                    </p>
                                                    <div className="flex">
                                                        <Link
                                                            to={'/timeslot'}
                                                            className="text-customColor hover:text-white border border-customColor hover:bg-customColor focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-customColor dark:text-customColor dark:hover:text-white dark:hover:bg-customColor dark:focus:ring-customColor"
                                                        >
                                                            Video Consultation
                                                        </Link>
                                                        <Link
                                                            // to={`/timeslot/${doc.doctorId}`}
                                                            className="text-customColor hover:text-white border border-customColor hover:bg-customColor focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-customColor dark:text-customColor dark:hover:text-white dark:hover:bg-customColor dark:focus:ring-customColor"
                                                        >
                                                            Book An Appointment
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </>



                        ) : (
                            <>
                                {profile.map((doc, index) => (
                                    <div
                                        key={index}
                                        style={{
                                            borderBottom: "1px solid #ccc",
                                            marginBottom: "10px",
                                            padding: "10px",
                                        }}
                                    >
                                        <div className="flex">
                                            <div
                                                className="h-48 lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden mt-5"
                                                style={{ backgroundImage: `url(${image[findIndexOf(doc)]})` }}
                                                title="Woman holding a mug"
                                                key={index}
                                            ></div>

                                            <div className=" border-gray-400 lg:border-l-0  lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                                                <div className="mb-8">
                                                    <h1 className="text-doctorName font-bold text-xl mb-2">
                                                        {doc.firstname} {doc.lastname}
                                                    </h1>
                                                    <p className="text-gray-500 text-lg">
                                                        Position - {doc.position}
                                                    </p>
                                                    <p className="text-gray-500 text-lg">
                                                        Department - {doc.department}
                                                    </p>
                                                    <p className="text-gray-500 text-lg">
                                                        Consultant - Surgical & Gynaecological Oncology &
                                                        Robotic Surgeon, HIPEC &
                                                    </p>
                                                    <p className="text-gray-500 text-lg">
                                                        PIPAC Super-specialist
                                                    </p>
                                                    <p className="text-gray-500 text-lg">
                                                        Speciality - Surgical Oncology
                                                    </p>
                                                    <p className="text-gray-500 text-lg font-bold">
                                                        MBBS, MS, MCh(Onco), FRCS Edinburgh
                                                    </p>
                                                    <div className="flex">
                                                        <Link
                                                            to={`/timeslot/${doc.doctorId}`}
                                                            className="text-customColor hover:text-white border border-customColor hover:bg-customColor focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-customColor dark:text-customColor dark:hover:text-white dark:hover:bg-customColor dark:focus:ring-customColor"
                                                        >
                                                            Video Consultation
                                                        </Link>

                                                        <Link
                                                            to={`/timeslot/${doc.doctorId}`}
                                                            className="text-customColor hover:text-white border border-customColor hover:bg-customColor focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-customColor dark:text-customColor dark:hover:text-white dark:hover:bg-customColor dark:focus:ring-customColor"
                                                        >
                                                            Book An Appointment
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                </div>
            <div className="flex justify-center mt-4 py-5">
                {/* Previous page button */}
                <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="mr-2 bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded"
                >
                   <TbPlayerTrackPrevFilled />
                </button>
                
                {/* Page numbers */}
                {Array.from({ length: Math.ceil(doctorProfile.length / doctorsPerPage) }).map((_, index) => (
                    <button
                        key={index}
                        onClick={() => paginate(index + 1)}
                        className={`mx-1 px-3 py-1 rounded ${
                            currentPage === index + 1 ? 'bg-customColor text-white' : 'bg-gray-200 hover:bg-gray-300'
                        }`}
                    >
                        {index + 1}
                    </button>
                ))}
                
                {/* Next page button */}
                <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === Math.ceil(doctorProfile.length / doctorsPerPage)}
                    className="ml-2 bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded"
                >
                    <TbPlayerTrackNextFilled />
                </button>
            </div>
            </div>

        </>
    )
}

export default Doctordetails
