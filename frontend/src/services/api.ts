import axios from "axios";

export default axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_PROD,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});
