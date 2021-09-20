import React from "react";
import { Online, Photo, Name, IsOnline } from "./messenger.styles";
import { Wrapper } from "../../styles/global";
import { VscCircleFilled } from "react-icons/vsc";

const ChatOnline = () => {
  return (
    <Online>
      <Wrapper
        width="fit-content"
        flex="flex"
        align="center"
        style={{ margin: "10px 0" }}
      >
        <Photo src="https://meetanentrepreneur.lu/wp-content/uploads/2019/08/profil-linkedin.jpg" />
        <Name>jose miguel</Name>
        <IsOnline>
          <VscCircleFilled />
        </IsOnline>
      </Wrapper>
    </Online>
  );
};

export default ChatOnline;
