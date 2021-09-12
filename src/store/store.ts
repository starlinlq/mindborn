import { createStore, applyMiddleware, Store } from "redux";
import { DispatchType, User, UserAction } from "./user/userTypes";
import thunk from "redux-thunk";
import userReducer from "./user/reducer";

const store: Store<User, UserAction> & { dispatch: DispatchType } = createStore(
  userReducer,
  applyMiddleware(thunk)
);

export default store;
