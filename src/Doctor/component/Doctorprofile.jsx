import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import instance from '../../Axios/Axios';

const Doctorprofile = () => {
    const [docProfile, setDocProfile] = useState("");

    const docId = useSelector((state) => state.doctorData.doctorId)

    useEffect(() => {
        instance.get(`/doctors/fetchdoctorprofile?docId=${docId}`).then((docProfile) => {
            if (docProfile && docProfile.data) {
                setDocProfile(docProfile);
            } else {
                console.error("image url not found in the image data");
            }
        })
            .catch((error) => {
                console.error(error, "fetch error`");
            });
    }, [])

    return (
        <>
            <div className="flex items-start justify-items-start">
                <div className="grid grid-rows-2">
                    <div className=" bg-blue-100 border-gray-200 shadow dark:bg-gray-800 dark:border-gray-700">
                        <a href="#">
                            {docProfile && docProfile.data && docProfile.data.imageUrl ? (
                                <img className="" src={docProfile.data.imageUrl} alt="" />
                            ) : (
                                <p>No image available</p>
                            )}
                        </a>
                        <div className="px-5 grid grid-rows-2">
                            {docProfile &&
                                docProfile.data &&
                                docProfile.data.doctor.firstname ? (
                                <h5 className="text-2xl font-bold tracking-tight dark:text-white text-slate-700">
                                    {docProfile.data.doctor.firstname}{" "}
                                    {docProfile.data.doctor.lastname} <br />
                                    <span className="text-base font-normal">
                                        {docProfile.data.doctor.department}
                                    </span>
                                </h5>
                            ) : (
                                <p>No name available</p>
                            )}
                            {docProfile &&
                                docProfile.data &&
                                docProfile.data.doctor.degree ? (
                                <p className="font-normal dark:text-gray-400 text-slate-700">
                                    {docProfile.data.doctor.degree}
                                </p>
                            ) : (
                                <p>Education details</p>
                            )}
                        </div>
                    </div>
                    <div className=" bg-blue-100 border-gray-200 shadow dark:bg-gray-800 dark:border-gray-700 mt-5 h-72">
                        <div className="px-5 ">
                            <h5 className="text-2xl font-bold tracking-tight dark:text-white text-slate-700 mt-8 underline">
                                Personal Info
                            </h5>

                            {docProfile && docProfile.data && docProfile.data.doctor ? (
                                <ul className="pt-3">
                                    <li>Phone : +91 {docProfile.data.doctor.number}</li>
                                    <li>E-mail : {docProfile.data.doctor.email}</li>
                                    <li>Address Line : {docProfile.data.doctor.house}</li>
                                    <li>Post : {docProfile.data.doctor.village}</li>
                                    <li>City : {docProfile.data.doctor.city}</li>
                                </ul>
                            ) : (
                                <p>Address details</p>
                            )}
                        </div>
                        <div className='py-5 px-20'>
                            <Link className='bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded'>
                                Edit profile
                            </Link>
                        </div>
                    </div>

                    {/* <div className='py-2'>

            
<Link
to={'/doctors/doctoraddprofile'}
className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
>
Add your profile
<svg
className="w-3.5 h-3.5 ml-2"
aria-hidden="true"
xmlns="http://www.w3.org/2000/svg"
fill="none"
viewBox="0 0 14 10"
>
<path
stroke="currentColor"
strokeLinecap="round"
strokeLinejoin="round"
strokeWidth={2}
d="M1 5h12m0 0L9 1m4 4L9 9"
/>
</svg>
</Link>
</div> */}
                </div>

                <div>
                    <section className="bg-white p-8">
                        <div className="max-w-3xl mx-auto">
                            <h1 className="text-2xl text-gray-800">About Me:</h1>
                            {docProfile &&
                                docProfile.data &&
                                docProfile.data.doctor.description ? (
                                <p className="text-lg text-gray-700 mt-4">
                                    {docProfile.data.doctor.description}
                                </p>
                            ) : (
                                <p>About doctor</p>
                            )}
                        </div>
                        <div className="mt-4">
                            <h1 className="font-bold text-gray-800 underline">Education</h1>
                            <div className="flex flex-row border mt-4 rounded-lg bg-slate-300 p-5 justify-between px-10 ">
                                <div>
                                    {docProfile && docProfile.data && docProfile.data.doctor ? (
                                        <ul>
                                            <h1 className="font-semibold">Year</h1>
                                            <li className="text-xs">{docProfile.data.doctor.year}</li>
                                            <li className="text-xs">2010</li>
                                        </ul>
                                    ) : (
                                        <p>Experience not displayed</p>
                                    )}
                                </div>
                                <div>
                                    {docProfile && docProfile.data && docProfile.data.doctor ? (
                                        <ul>
                                            <h1 className="font-semibold">Degree</h1>
                                            <li className="text-xs">
                                                {docProfile.data.doctor.degree}
                                            </li>
                                            <li className="text-xs">
                                                {docProfile.data.doctor.degree}
                                            </li>
                                        </ul>
                                    ) : (
                                        <p>Not qualified</p>
                                    )}
                                </div>
                                <div>
                                    {docProfile && docProfile.data && docProfile.data.doctor ? (
                                        <ul>
                                            <h1 className="font-semibold">Institute</h1>
                                            <li className="text-xs">
                                                {docProfile.data.doctor.college}
                                            </li>
                                            <li className="text-xs">
                                                {docProfile.data.doctor.college}
                                            </li>
                                        </ul>
                                    ) : (
                                        <p>Not qualified</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="mt-4">
                            <h1 className="font-bold text-gray-800 underline">Experienced</h1>
                            <div className="flex flex-row border mt-4 rounded-lg bg-slate-300 p-5 justify-between px-10 ">
                                <div>
                                    {docProfile && docProfile.data && docProfile.data.doctor ? (
                                        <ul>
                                            <h1 className="font-semibold">Year</h1>
                                            <li className="text-xs">
                                                {docProfile.data.doctor.experiencedyear}
                                            </li>
                                            <li className="text-xs">
                                                {docProfile.data.doctor.experiencedyear}
                                            </li>
                                        </ul>
                                    ) : (
                                        <p>Not Experienced</p>
                                    )}
                                </div>
                                <div>
                                    {docProfile && docProfile.data && docProfile.data.doctor ? (
                                        <ul>
                                            <h1 className="font-semibold">Department</h1>
                                            <li className="text-xs">{docProfile.data.doctor.workeddepartment}</li>
                                            <li className="text-xs">{docProfile.data.doctor.workeddepartment}</li>
                                        </ul>
                                    ) : (
                                        <p>Not experienced</p>
                                    )}
                                </div>
                                <div>
                                    {docProfile && docProfile.data && docProfile.data.doctor ? (
                                        <ul>
                                            <h1 className="font-semibold">Position</h1>
                                            <li className="text-xs">{docProfile.data.doctor.position}</li>
                                            <li className="text-xs">{docProfile.data.doctor.position}</li>
                                        </ul>
                                    ) : (
                                        <p>Not experienced</p>
                                    )}
                                </div>
                                <div>
                                    {docProfile && docProfile.data && docProfile.data.doctor ? (
                                        <ul>
                                            <h1 className="font-semibold">Hospital</h1>
                                            <li className="text-xs">{docProfile.data.doctor.hospital}</li>
                                            <li className="text-xs">{docProfile.data.doctor.hospital}</li>
                                        </ul>
                                    ) : (
                                        <p>Not experienced</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    )
}

export default Doctorprofile
