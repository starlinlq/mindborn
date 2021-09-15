import Create from "../components/create/Create";

import Menu from "../components/menu/Menu";
import { Wrapper } from "../styles/global";
import { LayoutWrapper } from "./layout.styles";

export function Submit() {
  return (
    <LayoutWrapper>
      <Menu />
      <Wrapper width="60%">
        <Create />
      </Wrapper>
      <Menu />
    </LayoutWrapper>
  );
}
