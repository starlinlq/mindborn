import { User, UserAction } from "./userTypes";
import * as actionType from "./actionType";

const initalState: User = {
  username: "",
  id: "",
  isAuth: false,
  photourl: "",
  loading: false,
  stateLoading: true,
  token: "",
  notifications: [],
  notifications_read: true,
};

const userReducer = (state = initalState, action: any) => {
  switch (action.type) {
    case actionType.VALIDATE_TOKEN:
      return {
        ...state,
        isAuth: true,
        loading: false,
        username: action.payload.username,
        id: action.payload.id,
        photourl: action.payload.photourl,
        stateLoading: false,
        notifications: action.payload.noti,
      };
    case actionType.REGISTER: {
      return {
        ...state,
        isAuth: true,
        username: action.payload.username,
        photourl: action.payload.photourl,
        id: action.payload.id,
        loading: false,
        stateLoading: false,
      };
    }
    case actionType.LOADING:
      return { ...state, loading: !state.loading };
    case actionType.LOG_IN:
      return {
        ...state,
        username: action.payload.username,
        id: action.payload.id,
        photourl: action.payload.photourl,
        stateLoading: false,
        isAuth: true,
        loading: false,
        notifications: action.payload.noti,
      };
    case actionType.UPDATE_ID:
      return { ...state, username: action.payload.username };
    case actionType.UPDATE_PHOTO:
      return { ...state, photourl: action.payload.photourl };
    case actionType.GET_NOTIFICATIONS:
      return { ...state, notifications: action.payload.notifications };
    case actionType.ADD_NOTIFICATION:
      return {
        ...state,
        notifications_read: false,
        notifications: [action.payload, ...state.notifications],
      };
    case actionType.READ_NOTIFICATIONS:
      return { ...state, notifications_read: action.payload };
    case actionType.LOG_OUT_USER: {
      localStorage.removeItem("Authorization");
      return {
        ...state,
        isAuth: false,
        username: "",
        photourl: "",
        id: "",
        token: "",
        notifications: [],
        loading: false,
        notifications_read: true,
        stateLoading: false,
      };
    }
    case actionType.SET_STATE_LOADING:
      return { ...state, stateLoading: action.payload };

    default:
      return state;
  }
};

export default userReducer;
