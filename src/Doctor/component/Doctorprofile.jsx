import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import instance from '../../Axios/Axios';

const Doctorprofile = () => {
    const [docProfile, setDocProfile] = useState("");

    const navigate = useNavigate()

    const docId = useSelector((state) => state.doctorData.doctorId)

    useEffect(() => {
        const doctorToken = localStorage.getItem('doctorToken')
        const headers = {
            'Authorization' : `Bearer ${doctorToken}`
        }

        instance.get(`/doctors/fetchdoctorprofile?docId=${docId}`,{ headers }).then((docProfile) => {
            if (docProfile.data.status) {
                navigate('/doctors/doctorsignup')
            } else if(docProfile && docProfile.data) {
                setDocProfile(docProfile);
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
