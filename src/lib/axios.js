import axios from "axios";
const axiosInstance = axios.create({
  // baseURL: "http://localhost:3001/api",
  baseURL: "https://simviz-backend.onrender.com/api"
});

// Add a request interceptor to include auth token
// axiosInstance.interceptors.request.use((config) => {
//   // Get token from localStorage (client-side only)
//   if (typeof window !== 'undefined') {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//   }
//   return config;
// });

export default axiosInstance;
