import { Dispatch, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sortComments } from "../../store/post/actionCreators";
import { RootState } from "../../store/store";
import Spinner from "../../styles/global";
import InfiniteScroll from "react-infinite-scroll-component";

import DisplayComment from "../displayComment/DisplayComment";
import { Section, Sort, Wrapper, Option, SortWrapper } from "./styles";

type Props = {
  id: string;
};
export default function CommentWrapper({ id }: Props) {
  const [sortBy, setSortBy] = useState("");
  const [hasMore, setHasMore] = useState(false);
  const [limit, setLimit] = useState(10);
  const { comments, commentLoading, commentsLenght } = useSelector(
    (state: RootState) => state.post
  );
  const dispatch = useDispatch<Dispatch<any>>();

  useEffect(() => {
    if (commentsLenght === 0) {
      setHasMore(false);
    }
  }, []);

  const handleSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (commentsLenght > 2) {
      dispatch(sortComments(id, event.target.value, limit));
      setSortBy(event.target.value);
    }
  };

  const fetchMoreComments = () => {
    if (limit > commentsLenght) {
      setHasMore(false);
      return;
    }
    dispatch(sortComments(id, sortBy, limit + 10));
    setLimit((prev) => prev + 10);
  };
  return (
    <Section>
      <SortWrapper>
        <span> Sort By: </span>
        <Sort onChange={handleSort}>
          <Option value="-likeCount">Best</Option>
          <Option value="-repliesCount">Top</Option>
          <Option value="-createdAt">New</Option>
          <Option value="createdAt">Old</Option>
        </Sort>
      </SortWrapper>

      {commentLoading ? (
        <Spinner />
      ) : (
        <Wrapper>
          <InfiniteScroll
            style={{ overflow: "hidden" }}
            dataLength={comments.length}
            next={fetchMoreComments}
            hasMore={hasMore}
            loader={<Spinner />}
            endMessage={
              <p style={{ textAlign: "center", marginTop: "10px" }}>
                <b>
                  {commentsLenght === 0
                    ? "Be the first to comment"
                    : " No more comments to display"}
                </b>
              </p>
            }
          >
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
          </InfiniteScroll>
        </Wrapper>
      )}
    </Section>
  );
}
