export type User = {
  id: string;
  username: string;
  photourl: string;
  isAuth: boolean;
  loading: boolean;
};

export type UserAction = {
  type: string;
  payload: User;
};

export interface UserReducer {
  initialState: User;
  action: UserAction;
}
export type DispatchType = () => UserAction;
