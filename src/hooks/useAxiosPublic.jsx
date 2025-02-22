import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://task-manager-backend-seven-pied.vercel.app/api/v1",
});
const useAxiosPublic = () => {
  return axiosInstance;
};

export default useAxiosPublic;
