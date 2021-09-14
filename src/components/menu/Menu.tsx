import { MenuWrapper, Title, List } from "./menu.styles";
import { VscHome, VscSettingsGear, VscListFlat } from "react-icons/vsc";
import { CgProfile } from "react-icons/cg";
import { history } from "../../App";
import { FiBookmark } from "react-icons/fi";

export default function Menu() {
  return (
    <MenuWrapper>
      <List width="100%" flex="flex" align="center">
        <VscHome style={{ color: "gray" }} />
        <Title
          active={history.location.pathname === "/" ? true : false}
          href="/"
        >
          Home
        </Title>
      </List>
      <List width="100%" flex="flex" align="center">
        <CgProfile style={{ color: "gray" }} />
        <Title
          active={history.location.pathname === "/profile" ? true : false}
          href="/profile"
        >
          Profile
        </Title>
      </List>
      <List width="100%" flex="flex" align="center">
        <FiBookmark style={{ color: "gray" }} />
        <Title
          active={history.location.pathname === "/profile" ? true : false}
          href="/bookmark"
        >
          Bookmark
        </Title>
      </List>
      <List width="100%" flex="flex" align="center">
        <VscListFlat style={{ color: "gray" }} />
        <Title>Category List</Title>
      </List>
      <List width="100%" flex="flex" align="center">
        <VscSettingsGear style={{ color: "gray" }} />
        <Title
          active={history.location.pathname === "/account" ? true : false}
          href="/account"
        >
          Account
        </Title>
      </List>
    </MenuWrapper>
  );
}
