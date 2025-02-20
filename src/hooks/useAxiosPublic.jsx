import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api/v1",
});
const useAxiosPublic = () => {
  return axiosInstance;
};

export default useAxiosPublic;
