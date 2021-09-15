import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import agent from "../../api/agent";
import { Reply } from "../../store/post/postTypes";
import Spinner from "../../styles/global";
import Comment from "../singlecomment/Comment";
import CreateComment from "../forms/CreateComment";
import { DisplayWrapper, ChildrenWrapper } from "./displayComment.styles";

type Props = {
  content: string;
  createdAt: string;
  likeCount: number;
  repliesCount: number;
  userId: { username: string; _id: string; photourl: string };
  _id: string;
  postId: string;
  likeIds: { _id: string }[];
};
export default function DisplayComment({
  createdAt,
  likeCount,
  repliesCount,
  userId,
  content,
  postId,
  _id,
  likeIds,
}: Props) {
  const [active, setActive] = useState(false);
  const [replies, setReplies] = useState<Reply[]>([]);
  const [loading, setLoading] = useState(false);
  const [display, setDisplay] = useState(false);
  const [replyLoading, setReplyLoading] = useState(false);

  useEffect(() => {
    async function loadReplies() {
      let data = await agent.comment.loadReplies(_id);
      setReplies(data.comment);
      setLoading(false);
    }

    if (replies.length === 0 && active) {
      setLoading(true);
      loadReplies();
    }
  }, [active]);

  const addReply = async (comment: string) => {
    setReplyLoading(true);
    try {
      let reply = await agent.comment.reply(comment, _id, postId);
      setReplies([reply, ...replies]);
      setDisplay(false);
      setReplyLoading(false);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <DisplayWrapper>
      <Comment
        setCreate={setDisplay}
        likeIds={likeIds}
        setActive={setActive}
        content={content}
        _id={_id}
        createdAt={createdAt}
        postId={postId}
        likeCount={likeCount}
        repliesCount={repliesCount}
        userId={userId}
      />
      <ChildrenWrapper>
        {active && (
          <>
            {replyLoading ? (
              <Spinner />
            ) : (
              display && (
                <div>
                  <CreateComment id="23" addReply={addReply} />
                </div>
              )
            )}
            {loading
              ? null
              : replies.length > 0 &&
                replies.map((data: Reply) => (
                  <Comment
                    likeIds={data.likeIds}
                    isReply={true}
                    key={data._id}
                    _id={data._id}
                    content={data.content}
                    userId={data.userId}
                    likeCount={data.likeCount}
                    createdAt={data.createdAt}
                  />
                ))}
            close
          </>
        )}
      </ChildrenWrapper>
    </DisplayWrapper>
  );
}
