export type User = {
  id: string;
  username: string;
  photourl: string;
  isAuth: boolean;
  loading: boolean;
  token: string;
  notifications: NotificationType[];
  notifications_read: boolean;
};

export type UserAction = {
  type: string;
  payload: User;
};

export interface UserReducer {
  initialState: User;
  action: UserAction;
}

export type Profile = {
  name: string;
  bio: string;
  photourl: string;
  location: string;
  userId: string;
  followers: number;
  following: number;
};
export type DispatchType = () => UserAction;
