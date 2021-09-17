import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { Comment, Reply, SinglePost } from "../store/post/postTypes";
axios.defaults.baseURL = "http://localhost:3000/api/v1";

const response = <T>(response: AxiosResponse<T>) => response.data;
const headers = {
  headers: { Authorization: `${localStorage.getItem("Authorization")}` },
};

const requests = {
  get: <T>(url: string, data?: any) => axios.get<T>(url, data).then(response),
  post: <T>(url: string, data?: any) =>
    axios.post<T>(url, data, headers).then(response),
  patch: <T>(url: string, data: any) =>
    axios.patch<T>(url, data, headers).then(response),
  delete: <T>(url: string, data?: any) =>
    axios.delete<T>(url, headers).then(response),
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
const post = {
  create: (data: { title: string; description: string; category: string }) =>
    requests.post<{ id: string }>("/post", data),
  getSinglePost: (id: string) =>
    requests.get<{
      post: SinglePost;
      comments: Comment[];
      commentsCount: number;
    }>(`/post/${id}`),
  getPosts: (url: string, filter?: string, date?: string) =>
    requests.get<{ posts: SinglePost[] }>(
      `${url}/?filterBy=${filter}`,
      headers
    ),
  like: (id: string) => requests.post(`/post/upvote/${id}`),
  dislike: (id: string) => requests.delete(`/post/upvote/${id}`),
  bookmark: (postId: string, createdBy: string) =>
    requests.post(`bookmark`, { postId, createdBy }),
  unBookmark: (id: string) => requests.delete(`bookmark/${id}`),
};

const comment = {
  create: (comment: string, id: string) =>
    requests.post<any>("/comment", { content: comment, postId: id }),
  loadReplies: (id: string) => requests.get<any>(`comment/replies/${id}`),
  reply: (comment: string, commentId: string, postId: string) =>
    requests.post<Reply>(`comment/reply`, {
      content: comment,
      postId,
      commentId,
    }),
  sort: (postId: string, query: string, limit: number) =>
    requests.get<{ comments: Comment[] }>(
      `/comment/?postid=${postId}&query=${query}&limit=${limit}`
    ),
  like: (id: string) => requests.post(`/comment/like/${id}`),
  dislike: (id: string) => requests.delete(`/comment/like/${id}`),
  deleteReply: (commentId: string, replyId: string) =>
    requests.delete(`/comment/?main=${commentId}&reply=${replyId}`),
  delete: (commentId: string) => requests.delete(`/comment/${commentId}`),
};
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

const agent = { user, post, features, comment };
export default agent;
