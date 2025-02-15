import axios from "axios";

const useAxiosSecure = () => {
  const axiosPublic = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
    withCredentials: true,
  });
  return axiosPublic;
};

export default useAxiosSecure;