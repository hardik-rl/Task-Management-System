import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const ApiCalling = {
  apiCallPost: (url, data) => api.post(url, data),
  apiCallGet: (url) => api.get(url),
  apiCallDelete: (url) => api.delete(url),
  apiCallPut: (url, data) => api.put(url, data),
};

export default ApiCalling;
