import { useEffect, useState } from "react";
import { FiHeart } from "react-icons/fi";
import { Like, Count } from "./likeCount.styles";
import { BsFillHeartFill } from "react-icons/bs";
import { toast } from "react-toastify";
import agent from "../../api/agent";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
type Props = {
  _id: string;
  count: number;
  likeIds: any[];
  type: string;
};
export default function LikeCount({ count, likeIds, _id, type }: Props) {
  let [liked, setLiked] = useState(false);
  const { id } = useSelector((state: RootState) => state.user);
  const [total, setTotal] = useState(count);

  useEffect(() => {
    let found = null;
    if (type === "comment") {
      found = likeIds.find((match) => match === id);
    } else if (type === "post") {
      found = likeIds.find((match) => match.userId === id);
    }
    if (found) {
      setLiked(true);
    }
  }, []);
  console.log(likeIds);

  const handleLiked = async () => {
    try {
      if (!liked && type === "comment") {
        await agent.comment.like(_id);
        setLiked(true);
        setTotal(total + 1);
        return;
      } else if (!liked && type === "post") {
        await agent.post.like(_id);
        setLiked(true);
        setTotal(total + 1);
        return;
      }
    } catch (error: any) {
      toast.error(error.message);
      setLiked(false);
      return;
    }
  };
  const handleDislike = async () => {
    try {
      if (liked && type === "comment") {
        await agent.comment.dislike(_id);
        setTotal(total - 1);
        setLiked(false);
        return;
      } else if (liked && type === "post") {
        await agent.post.dislike(_id);
        setTotal(total - 1);
        setLiked(false);
        return;
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  return (
    <Like>
      {liked ? (
        <BsFillHeartFill
          style={{ marginRight: "5px", color: "red" }}
          onClick={handleDislike}
        />
      ) : (
        <FiHeart style={{ marginRight: "5px" }} onClick={handleLiked} />
      )}
      <Count>{total}</Count>
    </Like>
  );
}
