import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://dummyjson.com",
  headers: {
    "Content-Type": "application/json",
  },
});

const ApiCalling = {
  apiCallPost: (url, data) => api.post(url, data),
  apiCallGet: (url) => api.get(url),
};

export default ApiCalling;
