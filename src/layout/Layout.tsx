import Filter from "../components/filter/Filter";
import Menu from "../components/menu/Menu";
import { Wrapper, Submit } from "../styles/global";
import { LayoutWrapper } from "./layout.styles";
type Props = {
  children: React.ReactNode;
};
export default function Layout({ children }: Props) {
  return (
    <LayoutWrapper>
      <Menu />
      <Wrapper width="60%">
        <Filter />
        {children}
      </Wrapper>
      <Submit type="button" width="200px" margin="0" height="45px" padding="0">
        Create Post
      </Submit>
    </LayoutWrapper>
  );
}
