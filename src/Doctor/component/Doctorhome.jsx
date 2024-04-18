import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import instance from '../../Axios/Axios';
import { FaUser, FaUserDoctor } from 'react-icons/fa6';
import { useSelector } from 'react-redux';

const Doctorhome = () => {
    const [paymentDetails, setPaymentDetails] = useState([])
    const [paymentCountsByMonth, setPaymentCountsByMonth] = useState({});
    const [bookingDetails, setBookingDetails] = useState([])

    const doctorId = useSelector((state) => state.doctorData.doctorId);


      useEffect(() => {
        try {
          instance.get('/doctors/barchartdoctorhome').then((response) => {
            setPaymentDetails(response.data.response)
          })
        } catch (err) {
          console.error(err);
        }
      }, [])

      useEffect(() => {
        const countsByMonth = paymentDetails.reduce((acc, payment) => {
          const [day, month, year] = payment.bookingDate.split('/');
          const monthIndex = parseInt(month) - 1; // Month index starts from 0
          const monthName = new Date(year, monthIndex).toLocaleString('default', { month: 'long' });
          acc[monthName] = (acc[monthName] || 0) + 1;
          return acc;
        }, {});
        setPaymentCountsByMonth(countsByMonth);
      }, [paymentDetails]);

      useEffect(() => {
        const doctorToken = localStorage.getItem('doctorToken')
        const headers = {
            'Authorization': `Bearer ${doctorToken}`
          };
        instance.get(`/doctors/fetchbookingdetails?doctorId=${doctorId}`,{ headers }).then((bookings) => {
                if(bookings.data.status) {
                    navigate('/doctors/doctorsignup')
                } else {
                    setBookingDetails(bookings.data.response);
                }
            });
    }, [doctorId]);
    

      const chartLabels = Object.keys(paymentCountsByMonth);
      const chartData = chartLabels.map((label) => paymentCountsByMonth[label]);

    const lineChartData = {
        labels: chartLabels,
        datasets: [
          {
            label: "Count",
            data: chartData,
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgb(75, 192, 192)",
            borderWidth: 1
          },
        ],
      };
    
      ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend,
      )
    
      const options = {
        plugins: {
          title: {
            display: true,
            text: 'Bookings Counts by Month',
            font: {
              size: 16
            }
          },
          legend: {
            display: true,
            position: 'bottom'
          }
        },
      };

  return (
    <>
    <div className='grid items-center justify-center py-10 px-10' style={{
      backgroundImage: `url(${'https://c4.wallpaperflare.com/wallpaper/686/903/613/soft-gradient-solid-color-gradient-hd-wallpaper-preview.jpg'})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh'
    }}>
      <div className='flex justify-between pl-8 pb-10'>
        <div className='bg-adminHomeBarChartDoctor text-white px-5 py-2 text-center flex items-center'>
          <span className='mr-2'><FaUserDoctor /></span>
          <div>
            <h1>Total Bookings</h1>
            <span>{bookingDetails.length}</span>
          </div>
        </div>

        <div className='bg-adminHomeBarChartUser text-white px-5 py-2 text-center flex items-center'>
          <span className='mr-2'><FaUser /></span>
          <div>
            <h1>Total Patients</h1>
            <span>{bookingDetails.length}</span>
          </div>
        </div>

        <div className='bg-green-400 text-white px-5 py-2 text-center flex items-center'>
          <span className='mr-2'><FaUserDoctor /></span>
          <div>
            <h1>Total Income</h1>
            <span>3000</span>
          </div>
        </div>
      </div>
      <Bar options={options} data={lineChartData} />
    </div>
  </>
  )
}

export default Doctorhome
