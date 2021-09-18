import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import agent from "../../api/agent";

import { SinglePost } from "../../store/post/postTypes";
import { RootState } from "../../store/store";
import Spinner, { Wrapper } from "../../styles/global";
import Filter from "../filter/Filter";
import InfiniteScroll from "react-infinite-scroll-component";
import Post from "../post/Post";
type Props = {
  url: string;
};
export default function DisplayPost({ url }: Props) {
  const [state, setstate] = useState<SinglePost[]>([]);
  const [length, setLength] = useState(0);
  const [limit, setLimit] = useState(10);
  const [hasMore, setHasMore] = useState(true);
  const { category } = useSelector((state: RootState) => state.post);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("-commentCount");

  useEffect(() => {
    setLoading(true);
    const get = async () => {
      let data = await agent.post.getPosts(url, filter, category, limit);
      console.log(data);

      if (data.posts.length === 0) {
        setHasMore(false);
      }
      setstate(data.posts);
      setLength(data.length);
      setLoading(false);
    };

    get();
  }, [filter, url, category]);

  const fetchMorePost = async () => {
    setLimit(limit + 10);
    if (limit >= length) {
      setHasMore(false);
      return;
    }
    let data = await agent.post.getPosts(url, filter, category, limit + 10);
    setstate(data.posts);
    setLoading(false);
  };

  return (
    <Wrapper width="100%">
      <Filter setFilter={setFilter} />
      {loading ? (
        <Spinner />
      ) : (
        <InfiniteScroll
          style={{ overflow: "hidden" }}
          dataLength={state.length}
          next={fetchMorePost}
          hasMore={hasMore}
          loader={<Spinner />}
          endMessage={
            <p style={{ textAlign: "center", margin: "10px 0" }}>
              <b>
                {state.length === 0
                  ? "No posts to display"
                  : " No more posts to display"}
              </b>
            </p>
          }
        >
          {state.map((post, index) => (
            <Post
              key={post._id + index}
              title={post.title}
              description={post.description}
              createdBy={post.createdBy}
              interestingVotes={post.interestingVotes}
              category={post.category}
              commentCount={post.commentCount}
              _id={post._id}
              createdAt={post.createdAt}
              votesCount={post.votesCount}
              bookmarkIds={post.bookmarkIds}
            />
          ))}
        </InfiniteScroll>
      )}
    </Wrapper>
  );
}
