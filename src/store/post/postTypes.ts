export type SinglePost = {
  title: string;
  description: string;
  createdBy: { username: string; _id: string; photourl: string };
  interestingVotes: { id: string }[];
  category: string;
  commentCount: number;
  _id: string;
  createdAt: string;
  votesCount: number;
  bookmarkIds: string[];
};

export type Reply = {
  content: string;
  likeCount: number;
  userId: { username: string; _id: string; photourl: string };
  _id: string;
  createdAt: string;
  likeIds: { _id: string }[];
};

export type Comment = {
  likeIds: { _id: string }[];
  _id: string;
  content: string;
  createdAt: string;
  likeCount: number;
  postId: string;
  repliesCount: number;
  userId: { username: string; _id: string; photourl: string };
};

export type Post = {
  singlePost: SinglePost;
  posts: SinglePost[];
  comments: Comment[] | any[];
  loading: boolean;
  commentLoading: boolean;
  commentsLenght: number;
};

export type PostAction = {
  type: string;
  payload: any | SinglePost;
};
