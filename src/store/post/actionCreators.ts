import { toast } from "react-toastify";
import { AnyAction } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import agent from "../../api/agent";
import { history } from "../../App";
import * as actionTypes from "./actionTypes";

type CreateParams = {
  title: string;
  description: string;
  category: string;
};

export function createPost(
  data: CreateParams
): ThunkAction<Promise<void>, {}, {}, AnyAction> {
  return async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
    getState
  ): Promise<void> => {
    try {
      let id = await agent.post.create(data);
      console.log(id);

      // let data = await agent.user.validate();
      // dispatch({ type: actionTypes.VALIDATE_TOKEN, payload: data });
    } catch (error: any) {
      toast.error(error.message);
    }
  };
}

export function getSinglePost(
  id: string
): ThunkAction<Promise<void>, {}, {}, AnyAction> {
  return async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
    getState
  ): Promise<void> => {
    try {
      dispatch({ type: actionTypes.LOADING, payload: {} });
      let data = await agent.post.getSinglePost(id);
      console.log(data);

      dispatch({
        type: actionTypes.GET_SINGLE,
        payload: {
          post: data.post,
          comments: data.comments,
          commentsCount: data.commentsCount,
        },
      });
      // let data = await agent.user.validate();
      // dispatch({ type: actionTypes.VALIDATE_TOKEN, payload: data });
    } catch (error: any) {
      history.push("/");
      toast.error(error.message);
    }
  };
}

export function getPosts(): ThunkAction<Promise<void>, {}, {}, AnyAction> {
  return async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
    getState
  ): Promise<void> => {
    try {
      console.log("hello poosts");

      // let data = await agent.user.validate();
      // dispatch({ type: actionTypes.VALIDATE_TOKEN, payload: data });
    } catch (error: any) {
      toast.error(error.message);
    }
  };
}

export function createComment(
  comment: string,
  id: string
): ThunkAction<Promise<void>, {}, {}, AnyAction> {
  return async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
    getState
  ): Promise<void> => {
    try {
      let data = await agent.comment.create(comment, id);
      console.log(data);

      dispatch({
        type: actionTypes.CREATE_COMMENT,
        payload: {
          _id: data.comment._id,
          content: data.comment.content,
          createdAt: data.comment.createdAt,
          postId: data.comment.postId,
          likeCount: data.comment.likeCount,
          repliesCount: data.comment.repliesCount,
          userId: data.user,
          likeIds: data.comment.likeIds,
        },
      });
    } catch (error: any) {
      toast.error(error.message);
    }
  };
}

export function sortComments(
  postId: string,
  query: string,
  limit: number
): ThunkAction<Promise<void>, {}, {}, AnyAction> {
  return async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
    getState
  ): Promise<void> => {
    try {
      dispatch({ type: actionTypes.LOADING_COMMENTS, payload: true });

      let data = await agent.comment.sort(postId, query, limit);
      console.log(data);

      dispatch({ type: actionTypes.SORT_COMMENTS, payload: data.comments });
    } catch (error: any) {
      dispatch({ type: actionTypes.LOADING_COMMENTS, payload: false });
      toast.error(error.message);
    }
  };
}
