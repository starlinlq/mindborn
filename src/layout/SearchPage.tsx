import { useLocation, useParams } from "react-router";
import CategoryList from "../components/categoryList/CategoryList";
import DisplayPost from "../components/displaypost/DisplayPost";
import DisplayUserSearch from "../components/displayUserSearch/DisplayUserSearch";
import Menu from "../components/menu/Menu";
import { Wrapper } from "../styles/global";
import { LayoutWrapper } from "./layout.styles";
import { Submit } from "./Submit";
import queryString from "query-string";

export default function SearchPage() {
  const location = useLocation();
  const { q } = queryString.parse(location.search);

  if (window.innerWidth < 700) {
    return (
      <LayoutWrapper>
        <Wrapper width="60%">
          <DisplayUserSearch />
          <Wrapper width="200px">
            <CategoryList />
          </Wrapper>
          <DisplayPost url={`/post/?q=${q}`} />
        </Wrapper>
      </LayoutWrapper>
    );
  }

  return (
    <LayoutWrapper>
      <Menu />
      <Wrapper width="60%">
        <DisplayUserSearch />
        <DisplayPost url={`/post/?q=${q}`} />
      </Wrapper>
      <Wrapper width="200px">
        <CategoryList />
      </Wrapper>
    </LayoutWrapper>
  );
}
