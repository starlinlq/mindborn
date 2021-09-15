import CreateInput from "../components/createinput/CreateInput";
import Filter from "../components/filter/Filter";
import DisplayPost from "../components/home/DisplayPost";
import Menu from "../components/menu/Menu";
import { Wrapper, Submit } from "../styles/global";
import { LayoutWrapper } from "./layout.styles";
type Props = {
  children: React.ReactNode;
};
export default function Home({ children }: Props) {
  return (
    <LayoutWrapper>
      <Menu />
      <Wrapper width="60%">
        <CreateInput />
        <Filter />
        <DisplayPost />
      </Wrapper>
      <Submit type="button" width="200px" margin="0" height="45px" padding="0">
        Create Post
      </Submit>
    </LayoutWrapper>
  );
}
