export type Post = {
  singlePost: {
    title: string;
    createdBy: string;
    photourl: string;
    createdAt: string;
  };
  loading: boolean;
};

export type PostAction = {
  type: string;
  payload: any;
};
