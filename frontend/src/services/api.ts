import axios from "axios";

export default axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_PROD,
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`,
  },
});
