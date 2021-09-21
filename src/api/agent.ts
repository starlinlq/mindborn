import axios, { AxiosError, AxiosResponse } from "axios";
import { request } from "http";
import { toast } from "react-toastify";
import { Comment, Reply, SinglePost } from "../store/post/postTypes";
import { Profile } from "../store/user/userTypes";
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
      user: {
        username: string;
        photourl: string;
        id: string;
      };
      token: string;
    }>("/auth/login", data),
  register: (data: {
    email: string;
    password: string;
    username: string;
    name: string;
  }) => requests.post<any>("/auth/register", data),
  validate: (token: string) =>
    requests.get("auth/validate", {
      headers: { Authorization: token },
    }),
  getProfile: (id: string) =>
    requests.get<{
      profile: Profile;
      followers: number;
      following: number;
      followersIds: { follower_id: string }[];
    }>(`/user/${id}`),
  follow: (id: string) => requests.post(`/user/follow/${id}`),
  unFollow: (id: string) => requests.delete(`/user/follow/${id}`),
  getFollowers: (id: string) =>
    requests.get<{
      data: {
        following_id: { _id: string; username: string; photourl: string };
      }[];
    }>(`user/followers/${id}`),
  getFollowing: (id: string) =>
    requests.get<{
      data: {
        following_id: { _id: string; username: string; photourl: string };
      }[];
    }>(`user/following/${id}`),
  updatePassword: (data: { currentPassword: string; newPassword: string }) =>
    requests.post("auth/update/password", data),
  updateId: (data: { newId: string; currentPassword: string }) =>
    requests.post("auth/update/id", data),
  upload: (data: any) => requests.post<{ url: string }>("/upload", data),
  updateProfile: (data: {
    bio: string;
    name: string;
    location: string;
    photourl: string;
  }) => requests.patch("/user", data),
  searchProfile: (q: string | any) =>
    requests.get<{ username: string; photourl: string; _id: string }[]>(
      `/auth/?q=${q}`
    ),
  getConversations: (id: string) => requests.get<any>(`/conversation/${id}`),
  getUser: (id: string) =>
    requests.get<{ username: string; photourl: string; _id: string }>(
      `/auth/${id}`
    ),
  getNotifications: () =>
    requests.get<NotificationType[]>("/notification", headers),
};

const chat = {
  getMessages: (id: any) =>
    requests.get<
      {
        conversationId: string;
        sender: { username: string; photourl: string; _id: string };
        text: string;
        _id: string;
        createdAt: string;
      }[]
    >(`/messages/${id}`),
  sendMessage: (data: {
    conversationId: string;
    sender: string;
    text: string;
  }) =>
    requests.post<{
      conversationId: string;
      sender: "";
      text: string;
      _id: string;
      createdAt: string;
    }>("/messages", data),
  getConversation: (firstuser: string, seconduser: string) =>
    requests.get(
      `/conversation/?firstuser=${firstuser}&seconduser=${seconduser}`
    ),
  makeConversation: (data: { senderId: string; recieverId: string | any }) =>
    requests.post(`/conversation/`, data),
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
  getPosts: (url: string, filter: string, category: string, limit: number) =>
    requests.get<{ length: number; posts: SinglePost[] }>(
      `${url}&filterBy=${filter}&category=${category}&limit=${limit}`,
      headers
    ),
  like: (id: string) => requests.post(`/post/upvote/${id}`),
  dislike: (id: string) => requests.delete(`/post/upvote/${id}`),
  bookmark: (postId: string, createdBy: string) =>
    requests.post(`/bookmark`, { postId, createdBy }),
  unBookmark: (id: string) => requests.delete(`/bookmark/${id}`),
  getBookmarks: () =>
    requests.get<{
      data: {
        postId: SinglePost;
        createdBy: { photourl: string; _id: string; username: string };
      }[];
    }>(`/bookmark`, headers),
  delete: (id: string) => requests.delete(`/post/${id}`),
  sendNotification: (data: {
    sender: string;
    reciever: string;
    notification: string;
    belongsTo: string;
    type: string;
  }) => requests.post("/notification", data),
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

const agent = { user, post, features, comment, chat };
export default agent;
