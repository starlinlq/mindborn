import { useEffect, useState } from "react";
import { FiBookmark } from "react-icons/fi";
import { useSelector } from "react-redux";
import agent from "../../api/agent";
import { RootState } from "../../store/store";
import { BookmarkWrapper } from "./bookmarkpost.styles";
import { BsFillBookmarkFill } from "react-icons/bs";

type Props = {
  postId: string;
  bookmarkIds: string[];
  createdBy: string;
};
export default function BookmarkPost({
  bookmarkIds,
  postId,
  createdBy,
}: Props) {
  const { id } = useSelector((state: RootState) => state.user);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    let found = bookmarkIds.find((match) => match === id);
    if (found) {
      setIsBookmarked(true);
      return;
    }
  }, []);

  const handleBookmark = async () => {
    if (!isBookmarked) {
      await agent.post.bookmark(postId, createdBy);
      setIsBookmarked(true);
      return;
    }
    await agent.post.unBookmark(postId);
    setIsBookmarked(false);
    return;
  };
  return (
    <BookmarkWrapper onClick={handleBookmark}>
      {isBookmarked ? <BsFillBookmarkFill /> : <FiBookmark />}
    </BookmarkWrapper>
  );
}
