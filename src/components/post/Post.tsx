import { Wrapper } from "../../styles/global";
import {
  Author,
  AuthorWrapper,
  Count,
  Comments,
  Description,
  Photo,
  PostWrapper,
  Title,
  Topic,
  Like,
} from "./post.styles";
import { IoChatboxOutline } from "react-icons/io5";
import { FiHeart, FiBookmark } from "react-icons/fi";
import { RiBookmarkFill } from "react-icons/ri";

export default function Post() {
  return (
    <PostWrapper>
      <Wrapper width="100%" flex="flex" align="center" content="space-between">
        <AuthorWrapper>
          <Photo src="https://phlearn.com/wp-content/uploads/2020/08/soft-light-coloring-photoshop-banner-after.jpg" />
          <Author>starlinlq</Author>
        </AuthorWrapper>
        <FiBookmark style={{ fontSize: "18px", color: "grey" }} />
      </Wrapper>
      <Wrapper width="100%" flex="flex" align="center">
        <Title>Name an artist everyone loves but you really cannot stand</Title>
        <Topic>discussion</Topic>
      </Wrapper>
      <Wrapper width="100%">
        <Description>
          I started learning HTML/CSS/JavaScript in January of this year, and
          sort of stopped in late June. I put in maybe 20 hours/week but
          struggled with it a good deal, since I couldn't see a clear path
          towards getting a job while being self taught despite hearing so many
          success stories. So, I took a JavaScript class at a local community
          college and thought it was alright - it reinforced some knowledge, and
          we went over 70% of the Eloquent JavaScript book and maybe half of the
          exercises for each of those chapters. I debated on whether self-taught
          was the route for me, or to go back to school for a new Bachelor's,
          this time in CS - I have a social sciences degree I finished last
          December.
        </Description>
      </Wrapper>
      <Wrapper width="100%" flex="flex">
        <Like>
          <FiHeart style={{ marginRight: "5px" }} />
          <Count>10</Count>
        </Like>
        <Comments>
          <span>5</span> <IoChatboxOutline style={{ marginLeft: "5px" }} />
        </Comments>
      </Wrapper>
    </PostWrapper>
  );
}
