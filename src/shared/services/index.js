import axios from "axios";
import { baseURL } from "../constants";
const ACCESS_TOKEN = localStorage.getItem("token") || "";
export const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-type": "application/json",
    Authorization: ACCESS_TOKEN,
  },
});
