import { useState } from "react";
import EditAccount from "../components/account/EditAccount";
import EditProfile from "../components/account/EditProfile";
import Menu from "../components/menu/Menu";
import { Wrapper } from "../styles/global";
import { SettingsContainer, LayoutWrapper, Option } from "./layout.styles";

export default function Settings() {
  const [selected, setSelected] = useState("account");

  return (
    <LayoutWrapper>
      <Menu />
      <SettingsContainer>
        <Wrapper
          width="100%"
          flex="flex"
          style={{ borderBottom: "1px solid lightgrey" }}
        >
          <Option
            onClick={() => setSelected("account")}
            active={selected === "account" ? true : false}
          >
            Account
          </Option>
          <Option
            onClick={() => setSelected("profile")}
            active={selected === "profile" ? true : false}
          >
            Profile
          </Option>
        </Wrapper>
        {selected === "account" && <EditAccount />}
        {selected === "profile" && <EditProfile />}
      </SettingsContainer>
    </LayoutWrapper>
  );
}
