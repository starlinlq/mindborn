import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

import DisplayComment from "../displayComment/DisplayComment";
import { Section, Sort, Wrapper, Option, SortWrapper } from "./styles";

export default function CommentWrapper() {
  const { comments } = useSelector((state: RootState) => state.post);
  return (
    <Section>
      <SortWrapper>
        <span> Sort By: </span>
        <Sort>
          <Option>Top</Option>
          <Option>Best</Option>
          <Option>New</Option>
          <Option>Old</Option>
        </Sort>
      </SortWrapper>

      <Wrapper>
        {comments.map(
          ({
            content,
            _id,
            createdAt,
            postId,
            likeCount,
            repliesCount,
            userId,
            likeIds,
          }) => (
            <DisplayComment
              likeIds={likeIds}
              key={_id}
              content={content}
              _id={_id}
              createdAt={createdAt}
              postId={postId}
              likeCount={likeCount}
              repliesCount={repliesCount}
              userId={userId}
            />
          )
        )}
      </Wrapper>
    </Section>
  );
}
