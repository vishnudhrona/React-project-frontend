import axios from 'axios'

const instance = axios.create({
    baseURL: import.meta.env.REACT_APP_BASE_URL,
    // timeout : 15000,
    headers:{
        "Content-Type": "application/json"
        },
        withCredentials : import.meta.env.REACT_APP_WITH_CREDENTIALS === 'true'
  });
  export default instance ;