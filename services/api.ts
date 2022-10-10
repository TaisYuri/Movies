import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/movie",

});

export default api;

export const apiTv = axios.create({
  baseURL: "https://api.themoviedb.org/3/tv",
});

