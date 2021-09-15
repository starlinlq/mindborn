import { FiHeart } from "react-icons/fi";
import { IoChatboxOutline } from "react-icons/io5";
import { Wrapper } from "../../styles/global";
import CreateComment from "../forms/CreateComment";
import LikeCount from "../likeCount/LikeCount";
import { Photo, Author, Comments, Count, Like } from "../post/post.styles";
import { AuthorSection } from "../singlePost/singlePost.styles";
import { CommentWrapper, Content, Date, Reply } from "./comment.styled";

type Props = {
  isReply?: boolean;
  setActive?: Function;
  content: string;
  createdAt: string;
  likeCount: number;
  repliesCount?: number;
  userId: { username: string; _id: string; photourl: string };
  _id: string;
  postId?: string;
  likeIds: { _id: string }[];
  setCreate?: Function;
};

export default function Comment({
  isReply,
  setActive,
  createdAt,
  likeCount,
  repliesCount,
  userId,
  content,
  postId,
  _id,
  setCreate,
  likeIds,
}: Props) {
  return (
    <CommentWrapper>
      <AuthorSection>
        <Photo src="https://phlearn.com/wp-content/uploads/2020/08/soft-light-coloring-photoshop-banner-after.jpg" />
        <Author>{userId.username}</Author>
        <Date> {createdAt.slice(0, 10)}</Date>
      </AuthorSection>
      <Wrapper width="100%">
        <Content>{content}</Content>
      </Wrapper>
      <Wrapper width="100%" flex="flex">
        <LikeCount
          type="comment"
          _id={_id}
          count={likeCount}
          likeIds={likeIds}
        />
        {isReply ? null : (
          <>
            <Comments onClick={() => setActive!(true)}>
              <Reply>{repliesCount} </Reply>
              <IoChatboxOutline style={{ marginLeft: "5px" }} />
            </Comments>
            <Comments
              style={{ marginLeft: "10px" }}
              onClick={() => {
                setActive!(true);
                setCreate!(true);
              }}
            >
              <Reply>Reply </Reply>
            </Comments>
          </>
        )}
      </Wrapper>
    </CommentWrapper>
  );
}
