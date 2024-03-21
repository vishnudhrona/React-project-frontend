import React, { useEffect, useState } from 'react';
import instance from '../../Axios/Axios';
import { useSelector } from 'react-redux';

const Prescriptionview = () => {
    const [prescription, setPrescription] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);

    const patientId = useSelector((state) => state.patientData.patientId);

    useEffect(() => {
        instance.get(`/fetchprescription?patientId=${patientId}`)
            .then((response) => {
                setPrescription(response.data.response);
            })
            .catch((error) => {
                console.error('Error fetching prescription:', error);
            });
    }, [patientId]);

    const downloadPrescription = (pdfBase64, fileName) => {
        const link = document.createElement('a');
        link.href = `data:application/pdf;base64,${pdfBase64}`;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = prescription.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {currentItems.map((pre, index) => (
                <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden">
                    <div className="px-4 py-3 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-800">{pre.doctorfirstname} {pre.doctorlastname}</h3>
                        <p className="text-sm text-gray-600">{pre.department}</p>
                    </div>
                    <div className="p-4">
                        <p className="text-sm text-gray-700">Date: {pre.bookingDate}</p>
                        <p className="text-sm text-gray-700">Time: {pre.bookingtime}</p>
                    </div>
                    <div className="px-4 py-3 border-t border-gray-200 flex justify-end">
                        <button
                            onClick={() => downloadPrescription(pre.pdfBase64, `prescription_${index}.pdf`)}
                            className="bg-buttonColor hover:bg-green-600 text-white py-2 px-4 rounded-md text-sm"
                        >
                            Download Prescription
                        </button>
                    </div>
                </div>
            ))}
        </div>

        <div className="flex justify-center mt-4">
                <nav className="flex" aria-label="Pagination">
                    {prescription.length > itemsPerPage && (
                        <ul className="flex">
                            {[...Array(Math.ceil(prescription.length / itemsPerPage)).keys()].map((number) => (
                                <li key={number} className="cursor-pointer">
                                    <button
                                        className={`${
                                            currentPage === number + 1
                                                ? 'bg-customColor text-white'
                                                : 'text-blue-500 hover:text-blue-800'
                                        } px-3 py-1 rounded-md`}
                                        onClick={() => paginate(number + 1)}
                                    >
                                        {number + 1}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </nav>
            </div>
        </>
    );
};

export default Prescriptionview;
