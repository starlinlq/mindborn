import * as actionTypes from "./actionType";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import agent from "../../api/agent";
import { history } from "../../App";
import { toast } from "react-toastify";

type LoginUser = { userid: string; password: string };
export function loginUser({
  userid,
  password,
}: LoginUser): ThunkAction<Promise<void>, {}, {}, AnyAction> {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    dispatch({ type: actionTypes.LOADING, payload: {} });
    console.log(userid);

    try {
      const { user, token } = await agent.user.login({
        username: userid,
        password,
      });

      localStorage.setItem("Authorization", `Bearer ${token}`);

      let noti = await agent.user.getNotifications(user.id);

      dispatch({ type: actionTypes.LOG_IN, payload: { ...user, noti } });

      history.push("/");
    } catch (error) {
      dispatch({ type: actionTypes.LOADING, payload: {} });
    }
  };
}

export function registerUser(data: {
  username: string;
  name: string;
  email: string;
  password: string;
}): ThunkAction<Promise<void>, {}, {}, AnyAction> {
  return async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
    getState
  ): Promise<void> => {
    try {
      dispatch({ type: actionTypes.LOADING });
      let register = await agent.user.register(data);
      localStorage.setItem("Authorization", `Bearer ${register.token}`);

      dispatch({ type: actionTypes.REGISTER, payload: register });
      history.push("/");
    } catch (error: any) {
      dispatch({ type: actionTypes.LOADING });
      toast.error(error);
    }
  };
}

export function validateUser(
  token: string
): ThunkAction<Promise<void>, {}, {}, AnyAction> {
  return async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
    getState
  ): Promise<void> => {
    try {
      let user = await agent.user.validate(token);

      let noti = await agent.user.getNotifications(user.id);

      dispatch({
        type: actionTypes.VALIDATE_TOKEN,
        payload: { ...user, noti },
      });
    } catch (error: any) {
      localStorage.removeItem("Authorization");
      toast.error(error.message);
    }
  };
}
