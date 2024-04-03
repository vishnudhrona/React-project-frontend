import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://react-project-backend-uqg4.onrender.com',
    // timeout : 15000,
    headers:{
        "Content-Type": "application/json"
        },
        withCredentials : true
  });
  export default instance;