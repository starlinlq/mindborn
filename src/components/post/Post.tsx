import { Wrapper } from "../../styles/global";
import {
  Author,
  AuthorWrapper,
  Comments,
  Description,
  Photo,
  PostWrapper,
  Title,
  Topic,
} from "./post.styles";
import { IoChatboxOutline } from "react-icons/io5";
import { SinglePost } from "../../store/post/postTypes";
import BookmarkPost from "../bookmarkPost/BookmarkPost";
import { history } from "../../App";
import LikeCount from "../likeCount/LikeCount";

export default function Post({
  title,
  description,
  createdBy,
  interestingVotes,
  category,
  commentCount,
  _id,
  createdAt,
  votesCount,
  bookmarkIds,
}: SinglePost) {
  const handleSelectPost = (id: string) => {
    history.push(`/post/${id}`);
  };
  const handleClick = (id: string) => {
    history.push(`/profile/${id}`);
  };
  return (
    <PostWrapper>
      <Wrapper width="100%" flex="flex" align="center" content="space-between">
        <AuthorWrapper>
          <Photo src={createdBy.photourl} />
          <Author onClick={() => handleClick(createdBy._id)}>
            {createdBy.username}
          </Author>
        </AuthorWrapper>
        <BookmarkPost
          postId={_id}
          bookmarkIds={bookmarkIds}
          createdBy={createdBy._id}
        />
      </Wrapper>
      <Wrapper
        width="100%"
        style={{ cursor: "pointer" }}
        onClick={() => handleSelectPost(_id)}
      >
        <Wrapper width="100%" flex="flex" align="center">
          <Title>{title}</Title>
          <Topic>{category}</Topic>
        </Wrapper>
        <Wrapper width="100%">
          <Description>{description}</Description>
        </Wrapper>
      </Wrapper>

      <Wrapper width="100%" flex="flex">
        <LikeCount
          recieverId={createdBy._id}
          _id={_id}
          count={votesCount}
          likeIds={interestingVotes}
          type="post"
        />
        <Comments>
          <span>{commentCount}</span>{" "}
          <IoChatboxOutline style={{ marginLeft: "5px" }} />
        </Comments>
      </Wrapper>
    </PostWrapper>
  );
}
