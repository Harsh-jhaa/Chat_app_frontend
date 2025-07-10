import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:7000/api',
  withCredentials: true, // Include credentials in requests, such as cookies and authentication headers
});

export default axiosInstance;
