import axios from "axios";

const baseApi = axios.create({
  baseURL: "https://be-nc-news-c79i.onrender.com/api",
});
export default baseApi;
