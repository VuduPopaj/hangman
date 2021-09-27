import axios from "axios";
const KEY = "448fd124caf0b4ef9cdbac3ef326fc80";

export default axios.create({
  baseURL: "https://api.themoviedb.org/3/movie/",
  params: {
    api_key: KEY,
  },
  headers: {},
});
