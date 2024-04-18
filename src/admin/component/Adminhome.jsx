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
import { FaUserDoctor } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";

const Adminhome = () => {
  const [department, setDepartment] = useState([])
  const [paymentDetails, setPaymentDetails] = useState([])
  const [users, setUsers] = useState([])
  const [doctors, setDoctors] = useState([])

  let pay = paymentDetails.filter((value) => value.adminPaymentStatus === 'success')

  useEffect(() => {
    try {
      instance.get('/admin/fetchdepartment').then((response) => {
        setDepartment(response.data.department || [])
      })
    } catch (err) {
      console.error(err);
    }
  }, [])

  useEffect(() => {
    try {
      const adminToken = localStorage.getItem('adminToken')
      const headers = {
        'Authorization': `Bearer ${adminToken}`
      };
      instance.get('/admin/paymentmanagement', { headers }).then((response) => {
        setPaymentDetails(response.data.response)
      })
    } catch (err) {
      console.error(err);
    }
  }, [])

  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken')
    const headers = {
      'Authorization': `Bearer ${adminToken}`
    };
    instance.get('/admin/usermanagement', { headers }).then((users) => {
      setUsers(users.data.users)
    })
  }, [])

  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken')
    const headers = {
      'Authorization': `Bearer ${adminToken}`
    };
    instance.get('/admin/doctormanagement', { headers }).then((doctors) => {
      setDoctors(doctors.data.doctors)
    })
  }, [])

  const countsByDepartment = paymentDetails.reduce((acc, payment) => {
    const department = payment.doctorDetails.department;
    acc[department] = (acc[department] || 0) + 1;
    return acc;
  }, {});

  const lineChartData = {
    labels: department.map((dept) => dept.department),
    datasets: [
      {
        label: "Count",
        data: department.map((dept) => countsByDepartment[dept.department] || 0),
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
        text: 'Bookings Counts by Department',
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
              <h1>Total Doctors</h1>
              <span>{doctors.length}</span>
            </div>
          </div>

          <div className='bg-adminHomeBarChartUser text-white px-5 py-2 text-center flex items-center'>
            <span className='mr-2'><FaUser /></span>
            <div>
              <h1>Total Patients</h1>
              <span>{users.length}</span>
            </div>
          </div>

          <div className='bg-green-400 text-white px-5 py-2 text-center flex items-center'>
            <span className='mr-2'><FaUserDoctor /></span>
            <div>
              <h1>Total Income</h1>
              <span>{pay.length*100}</span>
            </div>
          </div>
        </div>
        <Bar options={options} data={lineChartData} />
      </div>
    </>
  )
}

export default Adminhome
