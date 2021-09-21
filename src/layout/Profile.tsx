import { LayoutWrapper } from "./layout.styles";
import { Submit, Wrapper } from "../styles/global";
import CategoryList from "../components/categoryList/CategoryList";
import DisplayPost from "../components/displaypost/DisplayPost";
import Menu from "../components/menu/Menu";
import { useParams } from "react-router";
import ProfileCard from "../components/profile/ProfileCard";

export default function Profile() {
  let params = useParams<{ id: string }>();

  if (window.innerWidth < 700) {
    return (
      <LayoutWrapper>
        <Wrapper width="200px">
          <ProfileCard />
          <CategoryList />
        </Wrapper>
        <Wrapper width="60%">
          <DisplayPost url={`/post/user/?userId=${params.id}`} />
        </Wrapper>
      </LayoutWrapper>
    );
  }

  return (
    <LayoutWrapper>
      <Menu />
      <Wrapper width="60%">
        <DisplayPost url={`/post/user/?userId=${params.id}`} />
      </Wrapper>
      <Wrapper width="200px">
        <ProfileCard />
        <CategoryList />
      </Wrapper>
    </LayoutWrapper>
  );
}
