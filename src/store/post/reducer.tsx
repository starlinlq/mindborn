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
  commentLoading: false,
  commentsLenght: 0,
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
        commentsLenght: action.payload.commentsCount,
      };
    case actionTypes.CREATE_COMMENT:
      return { ...state, comments: [action.payload, ...state.comments] };
    case actionTypes.SORT_COMMENTS:
      return { ...state, comments: [...action.payload] };
    case actionTypes.LOADING_COMMENTS:
      return { ...state, loadingComment: action.payload };
    default:
      return state;
  }
}
