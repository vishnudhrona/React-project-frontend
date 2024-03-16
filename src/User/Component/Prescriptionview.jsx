import React, { useEffect, useState } from 'react';
import instance from '../../Axios/Axios';
import { useSelector } from 'react-redux';

const Prescriptionview = () => {
    const [prescription, setPrescription] = useState([]);

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

    return (
        <>
            <div className='gap-4'>
                {prescription.map((pre, index) => (
                    <table key={index} className="border-collapse border border-black w-full">
                        <thead>
                            <tr>
                                <th className="px-2 py-2 border border-black text-xs">
                                    {pre.doctorfirstname} {pre.doctorlastname}
                                </th>
                                <th className="px-2 py-2 text-xs">
                                    {pre.department}
                                </th>
                                <th className="px-2 py-2 border border-black text-xs">
                                    {pre.bookingDate}
                                </th>
                                <th className="px-2 py-2 text-xs">
                                    {pre.bookingtime}
                                </th>
                                <th className="px-2 py-2 border border-black">
                                    <button
                                    onClick={() => downloadPrescription(pre.pdfBase64, `prescription_${index}.pdf`)} 
                                    className=" bg-green-500 hover:bg-green-600 border rounded py-1 px-1 text-xs"
                                    >
                                        Download Your Prescription
                                    </button>
                                </th>
                            </tr>
                        </thead>
                    </table>
                ))}
            </div>
        </>
    );
};

export default Prescriptionview;
