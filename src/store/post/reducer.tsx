import { Post, PostAction } from "./postTypes";
import * as actionTypes from "./actionTypes";

const initialState: Post = {
  singlePost: {
    title: "",
    createdBy: { username: "", _id: "", photourl: "" },
    createdAt: "",
    _id: "",
    description: "",
    commentCount: 0,
    votesCount: 0,
    interestingVotes: [],
    category: "",
  },
  comments: [],
  posts: [],
  loading: false,
};
export default function reducer(state = initialState, action: PostAction) {
  switch (action.type) {
    case actionTypes.LOADING:
      return { ...state, loading: true };
    case actionTypes.GET_SINGLE:
      return {
        ...state,
        loading: false,
        singlePost: {
          title: action.payload.post.title,
          description: action.payload.post.description,
          createdAt: action.payload.post.createdAt,
          _id: action.payload.post._id,
          commentCount: action.payload.post.commentCount,
          interestingVotes: action.payload.post.interestingVotes,
          category: action.payload.post.category,
          createdBy: action.payload.post.createdBy,
          votesCount: action.payload.post.votesCount,
        },
        comments: [...action.payload.comments],
      };
    case actionTypes.CREATE_COMMENT:
      return { ...state, comments: [action.payload, ...state.comments] };
    default:
      return state;
  }
}
