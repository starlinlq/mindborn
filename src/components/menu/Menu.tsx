import { MenuWrapper, Title, List } from "./menu.styles";
import { VscHome, VscSettingsGear } from "react-icons/vsc";
import { CgProfile } from "react-icons/cg";
import { BiMessage } from "react-icons/bi";
import { history } from "../../App";
import { FiBookmark } from "react-icons/fi";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

export default function Menu() {
  const { id } = useSelector((state: RootState) => state.user);
  const params = useParams<{ id: string }>();

  return (
    <MenuWrapper>
      <List width="100%" flex="flex" align="center">
        <VscHome style={{ color: "gray" }} />
        <Title
          active={history.location.pathname === "/" ? true : false}
          href="/home"
        >
          Home
        </Title>
      </List>
      <List width="100%" flex="flex" align="center">
        <CgProfile style={{ color: "gray" }} />
        <Title
          active={
            history.location.pathname === `/profile/${params.id}` ? true : false
          }
          href={`/profile/${id}`}
        >
          Profile
        </Title>
      </List>
      <List width="100%" flex="flex" align="center">
        <BiMessage style={{ color: "gray" }} />
        <Title
          active={history.location.pathname === "/messages" ? true : false}
          href="/messages"
        >
          Messages
        </Title>
      </List>
      <List width="100%" flex="flex" align="center">
        <FiBookmark style={{ color: "gray" }} />
        <Title
          active={history.location.pathname === "/bookmark" ? true : false}
          href="/bookmark"
        >
          Bookmark
        </Title>
      </List>

      <List width="100%" flex="flex" align="center">
        <VscSettingsGear style={{ color: "gray" }} />
        <Title
          active={history.location.pathname === "/settings" ? true : false}
          href="/settings"
        >
          Account
        </Title>
      </List>
    </MenuWrapper>
  );
}
