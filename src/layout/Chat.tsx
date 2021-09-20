import Menu from "../components/menu/Menu";
import Messenger from "../components/messenger/Messenger";
import { LayoutWrapper } from "./layout.styles";

export default function Chat() {
  return (
    <LayoutWrapper>
      <Menu />
      <Messenger />
    </LayoutWrapper>
  );
}
