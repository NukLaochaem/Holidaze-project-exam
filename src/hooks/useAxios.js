import axios from "axios";
import AuthContext from "../auth/AuthContex";
import { useContext } from "react";

const url = "https://holidaze-api-strapi.herokuapp.com/";

export default function useAxios() {
  const [auth] = useContext(AuthContext);
  const apiClient = axios.create({
    baseURL: url,
  });

  apiClient.interceptors.request.use(function (config) {
    const token = auth.jwt;
    console.log(auth.jwt);
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    return config;
  });

  return apiClient;
}
