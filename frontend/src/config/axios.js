import axios from "axios";
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Authorization: `bearer ${localStorage.getItem("token")}`,
  },
});

export default instance;
