import axios from "axios";

const API = axios.create({
  baseURL: "https://pastebin-backend-kiho.onrender.com",
});

export default API;
