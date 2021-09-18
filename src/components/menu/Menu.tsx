import { MenuWrapper, Title, List } from "./menu.styles";
import { VscHome, VscSettingsGear, VscListFlat } from "react-icons/vsc";
import { CgProfile } from "react-icons/cg";
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
          href="/"
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
        <FiBookmark style={{ color: "gray" }} />
        <Title
          active={history.location.pathname === "/profile" ? true : false}
          href="/bookmark"
        >
          Bookmark
        </Title>
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
