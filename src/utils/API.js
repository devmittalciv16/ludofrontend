import axios from 'axios';
const url = "localhost:3002/"
export default axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    responseType: "json",
  });