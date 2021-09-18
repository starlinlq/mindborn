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
    case actionType.VALIDATE_TOKEN:
      return {
        ...state,
        isAuth: true,
        loading: false,
        username: action.payload.username,
        id: action.payload.id,
        photourl: action.payload.photourl,
      };
    case actionType.LOADING:
      return { ...state, loading: !state.loading };
    case actionType.LOG_IN:
      return {
        ...state,
        username: action.payload.username,
        id: action.payload.id,
        photourl: action.payload.photourl,

        isAuth: true,
        loading: false,
      };
    case actionType.UPDATE_ID:
      return { ...state, username: action.payload.username };

    default:
      return state;
  }
};

export default userReducer;
