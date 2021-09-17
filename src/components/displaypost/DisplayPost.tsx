import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import agent from "../../api/agent";

import { SinglePost } from "../../store/post/postTypes";
import { RootState } from "../../store/store";
import Spinner, { Wrapper } from "../../styles/global";
import Filter from "../filter/Filter";
import Post from "../post/Post";
type Props = {
  url: string;
};
export default function DisplayPost({ url }: Props) {
  const [state, setstate] = useState<SinglePost[]>([]);
  const { category } = useSelector((state: RootState) => state.post);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("-commentCount");
  useEffect(() => {
    setLoading(true);
    const get = async () => {
      let data = await agent.post.getPosts(url, filter, category);
      setstate(data.posts);
      setLoading(false);
    };

    get();
  }, [filter, url, category]);

  return (
    <Wrapper width="100%">
      <Filter setFilter={setFilter} />
      {loading ? (
        <Spinner />
      ) : (
        state.map((post, index) => (
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
        ))
      )}
    </Wrapper>
  );
}
