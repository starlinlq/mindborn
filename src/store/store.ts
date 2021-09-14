import { createStore, applyMiddleware, combineReducers } from "redux";
import { DispatchType, User, UserAction } from "./user/userTypes";
import thunk from "redux-thunk";
import user from "./user/reducer";
import post from "./post/reducer";
import { Post } from "./post/postTypes";

export interface RootState {
  post: Post;
  user: User;
}
const store = createStore(
  combineReducers<RootState>({ user, post }),
  applyMiddleware(thunk)
);

export default store;
