import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:4000/",
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`,
  },
});
