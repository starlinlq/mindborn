import Menu from "../components/menu/Menu";
import Messenger from "../components/messenger/Messenger";
import { Submit, Wrapper } from "../styles/global";
import { LayoutWrapper } from "./layout.styles";

export default function Chat() {
  return (
    <LayoutWrapper>
      <Messenger />
    </LayoutWrapper>
  );
}
