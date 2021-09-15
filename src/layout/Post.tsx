import Create from "../components/create/Create";
import Menu from "../components/menu/Menu";
import SinglePost from "../components/singlePost/SinglePost";
import { Submit, Wrapper } from "../styles/global";
import { LayoutWrapper } from "./layout.styles";

export default function Post() {
  return (
    <LayoutWrapper>
      <Menu />
      <Wrapper width="60%">
        <SinglePost />
      </Wrapper>
      <Submit
        main
        type="button"
        width="200px"
        margin="0"
        height="45px"
        padding="0"
      >
        Start a New Topic
      </Submit>
    </LayoutWrapper>
  );
}
