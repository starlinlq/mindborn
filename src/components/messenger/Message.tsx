import React from "react";
import { Wrapper } from "../../styles/global";
import { Lastseen, MessageContainer, Photo, Text } from "./messenger.styles";
type Props = {
  own?: boolean;
};
const Message = ({ own }: Props) => {
  return (
    <MessageContainer own={own}>
      <Wrapper width="fit-content">
        <div style={{ display: "flex" }}>
          <Photo src="https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80" />
          <Text>
            is simply dummy text of the printing and typesetting industry. Lorem
            Ipsum has been the industry's standard dummy text ever since the
            1500s, when an unknown
          </Text>
        </div>
        <Lastseen>1 hour ago</Lastseen>
      </Wrapper>
    </MessageContainer>
  );
};

export default Message;
