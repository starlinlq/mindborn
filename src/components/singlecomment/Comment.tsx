import { IoChatboxOutline } from "react-icons/io5";
import { Wrapper } from "../../styles/global";
import LikeCount from "../likeCount/LikeCount";
import { Photo, Author, Comments } from "../post/post.styles";
import { AuthorSection } from "../singlePost/singlePost.styles";
import {
  CommentWrapper,
  Content,
  Date,
  Options,
  OptionsReply,
  Reply,
  Select,
} from "./comment.styled";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { useState } from "react";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";

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
  handleSelected?: Function;
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
  handleSelected,
}: Props) {
  const [displayOptions, setDisplayOptions] = useState(false);
  const { id } = useSelector((state: RootState) => state.user);

  const handleDisplay = (active: boolean) => {
    setDisplayOptions(active);
  };

  return (
    <CommentWrapper>
      <AuthorSection
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex" }}>
          <Photo src="https://phlearn.com/wp-content/uploads/2020/08/soft-light-coloring-photoshop-banner-after.jpg" />
          <Author>{userId.username}</Author>
          <Date> {createdAt.slice(0, 10)}</Date>
        </div>

        {userId._id === id && (
          <OptionsReply>
            <BiDotsHorizontalRounded onClick={() => handleDisplay(true)} />

            <Options
              active={displayOptions}
              onMouseLeave={() => handleDisplay(false)}
            >
              <Select
                onClick={() => {
                  setDisplayOptions(false);
                  handleSelected!(_id, isReply, "edit");
                }}
              >
                Edit
              </Select>
              <Select
                onClick={() => {
                  setDisplayOptions(false);
                  handleSelected!(_id, isReply, "remove");
                }}
              >
                Remove
              </Select>
            </Options>
          </OptionsReply>
        )}
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
        {!isReply && (
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
