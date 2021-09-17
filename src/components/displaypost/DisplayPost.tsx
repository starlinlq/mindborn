import { useEffect, useState } from "react";
import agent from "../../api/agent";

import { SinglePost } from "../../store/post/postTypes";
import Spinner, { Wrapper } from "../../styles/global";
import Filter from "../filter/Filter";
import Post from "../post/Post";
type Props = {
  url: string;
};
export default function DisplayPost({ url }: Props) {
  const [state, setstate] = useState<SinglePost[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("-commentCount");
  useEffect(() => {
    const get = async () => {
      let data = await agent.post.getPosts(url, filter);
      console.log(data);
      setstate(data.posts);
      setLoading(false);
    };

    get();
  }, [filter, url]);

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
