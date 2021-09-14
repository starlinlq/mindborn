import { Post, PostAction } from "./postTypes";

const initialState: Post = {
  singlePost: { title: "", photourl: "", createdBy: "", createdAt: "" },
  loading: false,
};
export default function reducer(state = initialState, action: PostAction) {
  switch (action.type) {
    default:
      return state;
  }
}
