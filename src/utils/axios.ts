import axios from "axios";
import { getSessionToken } from "./caches";

const baseURL = "http://localhost:3333";

const api = axios.create({ baseURL });

const inteceptor = function () {
  api.interceptors.request.use(async (config: any) => {
    const token = getSessionToken();
    if (token?.token) {
      config.headers.Authorization = `Bearer ${token.token}`;
    }
    config.headers.Accept = "application/json";
    config.headers["Access-Control-Allow-Origin"] = "*";
    config.headers["Access-Control-Allow-Credentials"] = true;
    return config;
  });
};

inteceptor();

export { api as default, inteceptor };
