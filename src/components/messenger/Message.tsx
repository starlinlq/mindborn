import React from "react";
import { Wrapper } from "../../styles/global";
import { Lastseen, MessageContainer, Photo, Text } from "./messenger.styles";
import { format } from "timeago.js";
type Props = {
  own?: boolean;
  conversationId: string;
  sender: { username: string; photourl: string; _id: string };
  text: string;
  _id: string;
  createdAt: string;
};
const Message = ({ own, text, sender, createdAt }: Props) => {
  return (
    <MessageContainer own={own}>
      <Wrapper width="fit-content">
        <div style={{ display: "flex" }}>
          {own ? (
            <>
              <Text style={{ backgroundColor: "#E1E5EA", color: "black" }}>
                {text}
              </Text>
              <Photo src={sender.photourl} style={{ margin: "0 10px" }} />
            </>
          ) : (
            <>
              <Photo src={sender.photourl} />
              <Text>{text}</Text>
            </>
          )}
        </div>
        <Lastseen>{format(createdAt)}</Lastseen>
      </Wrapper>
    </MessageContainer>
  );
};

export default Message;
