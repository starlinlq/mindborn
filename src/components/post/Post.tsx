import { Wrapper } from "../../styles/global";
import {
  Author,
  AuthorWrapper,
  Count,
  Comments,
  Description,
  Photo,
  PostWrapper,
  Title,
  Topic,
  Like,
} from "./post.styles";
import { IoChatboxOutline } from "react-icons/io5";
import { FiHeart } from "react-icons/fi";
import { SinglePost } from "../../store/post/postTypes";
import BookmarkPost from "../bookmarkPost/BookmarkPost";
import { history } from "../../App";

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
  return (
    <PostWrapper onClick={() => handleSelectPost(_id)}>
      <Wrapper width="100%" flex="flex" align="center" content="space-between">
        <AuthorWrapper>
          <Photo src="https://phlearn.com/wp-content/uploads/2020/08/soft-light-coloring-photoshop-banner-after.jpg" />
          <Author>{createdBy.username}</Author>
        </AuthorWrapper>
        <BookmarkPost
          postId={_id}
          bookmarkIds={bookmarkIds}
          createdBy={createdBy._id}
        />
      </Wrapper>
      <Wrapper width="100%" flex="flex" align="center">
        <Title>{title}</Title>
        <Topic>{category}</Topic>
      </Wrapper>
      <Wrapper width="100%">
        <Description>{description}</Description>
      </Wrapper>
      <Wrapper width="100%" flex="flex">
        <Like>
          <FiHeart style={{ marginRight: "5px" }} />
          <Count>{votesCount}</Count>
        </Like>
        <Comments>
          <span>{commentCount}</span>{" "}
          <IoChatboxOutline style={{ marginLeft: "5px" }} />
        </Comments>
      </Wrapper>
    </PostWrapper>
  );
}
