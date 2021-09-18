import * as actionTypes from "./actionType";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import agent from "../../api/agent";
import { RootState } from "../store";
import { history } from "../../App";
import { toast } from "react-toastify";

type LoginUser = { userid: string; password: string };
export function loginUser({
  userid,
  password,
}: LoginUser): ThunkAction<Promise<void>, {}, {}, AnyAction> {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    dispatch({ type: actionTypes.LOADING, payload: {} });

    try {
      const { user, token } = await agent.user.login({
        username: userid,
        password,
      });

      localStorage.setItem("Authorization", `Bearer ${token}`);

      dispatch({ type: actionTypes.LOG_IN, payload: user });
      history.push("/");
    } catch (error) {
      dispatch({ type: actionTypes.LOADING, payload: {} });
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
      let data = await agent.user.validate(token);
      dispatch({ type: actionTypes.VALIDATE_TOKEN, payload: data });
    } catch (error: any) {
      localStorage.removeItem("Authorization");
      toast.error(error.message);
    }
  };
}
