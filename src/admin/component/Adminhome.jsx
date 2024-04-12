import React from 'react'
import { Line } from 'react-chartjs-2';

const Adminhome = () => {

    const chartData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'Sales Data',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
          },
        ],
      };
    
      const chartOptions = {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      };

  return (
    <div>
      <h2>Sales Data</h2>
      <Line 
      data={chartData} 
      options={chartOptions}
       />
    </div>
  )
}

export default Adminhome
