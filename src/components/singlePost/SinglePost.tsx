//share styles with Post component
import Spinner, { Wrapper } from "../../styles/global";
import {
  Author,
  AuthorWrapper,
  Count,
  Comments,
  Photo,
  Title,
  Topic,
  Like,
} from "../post/post.styles";
import { IoChatboxOutline } from "react-icons/io5";
import { FiHeart, FiBookmark } from "react-icons/fi";
import { RiBookmarkFill } from "react-icons/ri";
import { SinglePostWrapper, Description } from "./singlePost.styles";
import { Dispatch, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useParams } from "react-router";
import { getSinglePost } from "../../store/post/actionCreators";
import CreateComment from "../forms/CreateComment";
import { history } from "../../App";
import Comment from "../singlecomment/Comment";
import { Content } from "../singlecomment/comment.styled";
import DisplayComment from "../displayComment/DisplayComment";
import LikeCount from "../likeCount/LikeCount";
import CommentWrapper from "../commentWrapper/CommentWrapper";

export default function SinglePost() {
  const { id } = useParams<{ id: string }>();
  const dispatch: Dispatch<any> = useDispatch();
  const { loading, singlePost } = useSelector((state: RootState) => state.post);

  useEffect(() => {
    dispatch(getSinglePost(id));
  }, [id, dispatch]);

  if (loading) {
    return <Spinner />;
  }

  const handleClick = (id: string) => {
    history.push(`profile/${id}`);
  };

  return (
    <SinglePostWrapper>
      <Wrapper width="100%" flex="flex" align="center" content="space-between">
        <AuthorWrapper>
          <Photo src="https://phlearn.com/wp-content/uploads/2020/08/soft-light-coloring-photoshop-banner-after.jpg" />
          <Author onClick={() => handleClick(singlePost.createdBy._id)}>
            {singlePost.createdBy.username}
          </Author>
        </AuthorWrapper>
        <FiBookmark style={{ fontSize: "18px", color: "grey" }} />
      </Wrapper>
      <Wrapper width="100%" flex="flex" align="center">
        <Title>{singlePost.title}</Title>
        <Topic>{singlePost.category}</Topic>
      </Wrapper>
      <Wrapper width="100%">
        <Description>{singlePost.description}</Description>
      </Wrapper>
      <Wrapper width="100%" flex="flex">
        <LikeCount
          _id={singlePost._id}
          count={singlePost.votesCount}
          likeIds={singlePost.interestingVotes}
          type="post"
        />
        <Comments>
          <span>{singlePost.commentCount}</span>{" "}
          <IoChatboxOutline style={{ marginLeft: "5px" }} />
        </Comments>
      </Wrapper>
      <Wrapper width="100%">
        <CreateComment id={singlePost._id} />
      </Wrapper>
      <CommentWrapper />
    </SinglePostWrapper>
  );
}
