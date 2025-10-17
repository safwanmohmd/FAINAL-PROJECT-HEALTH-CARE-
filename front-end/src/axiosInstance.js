import axios from "axios"
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL

})

axiosInstance.interceptors.request.use((config) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;

    if (token) {
        config.headers.Authorization = `Bearer ${token}`

    }
    return config
})

export default axiosInstance