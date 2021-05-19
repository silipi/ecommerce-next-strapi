import axios from "axios";

const API_URL = process.env.PUBLIC_API_URL || "http://localhost:1337";

const strapiApi = axios.create({
  baseURL: API_URL,
});

export default strapiApi;
