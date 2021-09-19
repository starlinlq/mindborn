import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import agent from "../../api/agent";

import { SinglePost } from "../../store/post/postTypes";
import { RootState } from "../../store/store";
import Spinner, { Wrapper } from "../../styles/global";
import Filter from "../filter/Filter";
import InfiniteScroll from "react-infinite-scroll-component";
import Post from "../post/Post";
import { Confirm, Delete, DeleteContainer, ConfirmWrapper } from "./styles";
import { useLocation, useParams } from "react-router";
import { toast } from "react-toastify";
type Props = {
  url: string;
};
export default function DisplayPost({ url }: Props) {
  const [state, setstate] = useState<SinglePost[]>([]);
  const [length, setLength] = useState(0);
  const [limit, setLimit] = useState(10);
  const [hasMore, setHasMore] = useState(true);
  const { category } = useSelector((state: RootState) => state.post);
  const { id } = useSelector((state: RootState) => state.user);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("-commentCount");
  const location = useLocation();
  const params = useParams<{ id: string }>();
  const [selected, setSelected] = useState("");

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

  const handleDelete = async (id: string) => {
    try {
      await agent.post.delete(id);
      let filtered = state.filter((match) => match._id !== id);
      toast.info("post deleted");
      setstate(filtered);
      setSelected("");
    } catch (error: any) {
      toast.error(error.message);
      setSelected("");
    }
  };

  const fetchMorePost = async () => {
    setLimit(limit + 10);
    let data = await agent.post.getPosts(url, filter, category, limit + 10);
    if (limit + 10 > length) {
      setHasMore(false);
      return;
    }
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
            <DeleteContainer key={post._id + index}>
              {location.pathname === `/profile/${params.id}` &&
                id === params.id && (
                  <ConfirmWrapper>
                    <Delete onClick={() => setSelected(post._id)}>
                      {" "}
                      Delete{" "}
                    </Delete>
                    {selected === post._id && (
                      <div>
                        <Confirm onClick={() => handleDelete(post._id)}>
                          Yes
                        </Confirm>{" "}
                        <Confirm onClick={() => setSelected("")}>No</Confirm>
                      </div>
                    )}
                  </ConfirmWrapper>
                )}

              <Post
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
            </DeleteContainer>
          ))}
        </InfiniteScroll>
      )}
    </Wrapper>
  );
}
