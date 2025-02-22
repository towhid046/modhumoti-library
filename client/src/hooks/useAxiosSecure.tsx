import axios from "axios";

const useAxiosSecure = () => {
    const axiosSecure = axios.create({
        baseURL: import.meta.env.VITE_SERVER_URL,
        withCredentials: true,
    });
    return axiosSecure;
};

export default useAxiosSecure;