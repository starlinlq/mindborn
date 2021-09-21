import Menu from "../components/menu/Menu";
import { Wrapper, Submit } from "../styles/global";
import { LayoutWrapper } from "./layout.styles";
import DisplayPost from "../components/displaypost/DisplayPost";
import CategoryList from "../components/categoryList/CategoryList";
import { history } from "../App";

export default function Home() {
  const handleClick = () => {
    history.push("/submit");
  };
  return (
    <LayoutWrapper>
      <Menu />
      <Wrapper width="60%">
        <DisplayPost url="/post/?" />
      </Wrapper>
      <Wrapper width="200px">
        <Submit
          onClick={handleClick}
          main
          type="button"
          width="200px"
          margin="0"
          height="45px"
          padding="0"
        >
          Create Post
        </Submit>
        <CategoryList />
      </Wrapper>
    </LayoutWrapper>
  );
}
