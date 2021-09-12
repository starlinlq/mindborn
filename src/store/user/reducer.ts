import { User, UserAction } from "./userTypes";
import * as actionType from "./actionType";

const initalState: User = {
  username: "",
  id: "",
  isAuth: false,
  photourl: "",
  loading: false,
};

const userReducer = (state = initalState, action: UserAction) => {
  switch (action.type) {
    case actionType.LOG_IN:
      return {
        username: action.payload.username,
        id: action.payload.id,
        photourl: action.payload.photourl,
        isAuth: action.payload.isAuth,
        loading: false,
      };

    default:
      return state;
  }
};

export default userReducer;
