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
    bookmarkIds: [],
  },
  commentLoading: false,
  commentsLenght: 0,
  comments: [],
  posts: [],
  loading: false,
  category: "all",
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
          bookmarkIds: action.payload.post.bookmarkIds,
        },
        comments: [...action.payload.comments],
        commentsLenght: action.payload.commentsCount,
      };
    case actionTypes.DELETE_COMMENT:
      return {
        ...state,
        singlePost: {
          ...state.singlePost,
          commentCount: state.singlePost.commentCount - 1,
        },
        comments: [
          ...state.comments.filter((match) => match._id !== action.payload),
        ],
      };
    case actionTypes.CREATE_COMMENT:
      return {
        ...state,
        comments: [action.payload, ...state.comments],
        singlePost: {
          ...state.singlePost,
          commentCount: state.singlePost.commentCount + 1,
        },
      };
    case actionTypes.SORT_COMMENTS:
      return { ...state, comments: [...action.payload] };
    case actionTypes.LOADING_COMMENTS:
      return { ...state, loadingComment: action.payload };
    case actionTypes.ADD_COMMNET_COUNT_REPLY:
      return {
        ...state,
        singlePost: {
          ...state.singlePost,
          commentCount: state.singlePost.commentCount + 1,
        },
        comments: [
          ...state.comments.map((match) => {
            if (match._id === action.payload) {
              match.repliesCount += 1;
              return match;
            }
            return match;
          }),
        ],
      };
    case actionTypes.REMOVE_COMMENT_COUNT_REPLY:
      return {
        ...state,
        singlePost: {
          ...state.singlePost,
          commentCount: state.singlePost.commentCount - 1,
        },
        comments: [
          ...state.comments.map((match) => {
            if (match._id === action.payload) {
              match.repliesCount -= 1;
              return match;
            }
            return match;
          }),
        ],
      };

    case actionTypes.CATEGORY:
      return { ...state, category: action.payload };

    default:
      return state;
  }
}
