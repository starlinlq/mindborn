import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import agent from "../../api/agent";
import { RootState } from "../../store/store";
import { Button, Wrapper } from "../../styles/global";
import ChatOnline from "./ChatOnline";
import ActiveConversation from "./ActiveConversation";
import Message from "./Message";
import {
  ChatBox,
  MessengerContainer,
  Name,
  Online,
  Photo,
  SearchFriends,
  MessagesWrapper,
  WriteMessage,
  ConversationContainer,
} from "./messenger.styles";

const Messenger = () => {
  const [conversations, setConversation] = useState<any>(null);
  const user = useSelector((state: RootState) => state.user);
  console.log(user.id);

  useEffect(() => {
    const get = async () => {
      try {
        if (user.id) {
          const res = await agent.user.getConversations(user.id);
          setConversation(res);
        }
      } catch (error) {}
    };
    get();
  }, [user.id]);
  return (
    <MessengerContainer>
      <ConversationContainer>
        <SearchFriends />
        {conversations &&
          conversations.map((c: any) => (
            <ActiveConversation key={c._id} c={c} />
          ))}
      </ConversationContainer>

      <ChatBox>
        <MessagesWrapper>
          <Message own />
          <Message />
          <Message />
          <Message />
          <Message />
        </MessagesWrapper>

        <Wrapper width="100%" flex="flex" align="center">
          {" "}
          <WriteMessage cols={5} rows={7} />
          <Button padding="10px" margin="" width="150px">
            submit
          </Button>
        </Wrapper>
      </ChatBox>
      <Wrapper width="20%">
        <ChatOnline />
      </Wrapper>
    </MessengerContainer>
  );
};

export default Messenger;
