import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
axios.defaults.baseURL = "http://localhost:3000/api/v1";

const response = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string, data?: any) => axios.get<T>(url, data).then(response),
  post: <T>(url: string, data: any) => axios.post<T>(url, data).then(response),
  patch: <T>(url: string, data: any) =>
    axios.patch<T>(url, data).then(response),
  delete: <T>(url: string, data?: any) => axios.delete<T>(url).then(response),
};

const user = {
  login: (data: Login) =>
    requests.post<{
      user: { username: string; photourl: string; id: string };
      token: string;
    }>("/auth/login", data),
  validate: (token: string) =>
    requests.get("auth/validate", {
      headers: { Authorization: token },
    }),
};
const post = {};
const features = {};

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error: AxiosError) {
    const { data, config, status } = error.response!;
    switch (status) {
      case 400:
        toast.error(data.msg);
        break;
      case 401:
        toast.error(data.msg);
        break;
      case 404:
        toast.error(data.msg);
        break;
      case 500:
        toast.error(data.msg);
        break;
      default:
        break;
    }

    return Promise.reject(error);
  }
);

const agent = { user, post, features };
export default agent;
