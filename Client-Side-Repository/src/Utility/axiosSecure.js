import axios from "axios";

const axiosSecure = axios.create({
   baseURL: import.meta.env.VITE_ApiUrl,
   withCredentials: true,
   headers: { "content-type": "application/json" },
});

export default axiosSecure;
