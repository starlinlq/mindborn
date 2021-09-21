import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import agent from "../../api/agent";
import { RootState } from "../../store/store";
import { Button, Wrapper } from "../../styles/global";
import ChatOnline from "./ChatOnline";
import ActiveConversation from "./ActiveConversation";
import Message from "./Message";
import { v4 as uuidv4 } from "uuid";
import {
  ChatBox,
  MessengerContainer,
  MessagesWrapper,
  WriteMessage,
  ConversationContainer,
} from "./messenger.styles";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import socket from "../../socket/socket";

const Messenger = () => {
  const [conversations, setConversation] = useState<any>(null);
  const [arrivalMessage, setArrivalMessage] = useState<any>();
  const [currentChat, setCurrentChat] = useState<any>(null);
  const [newMessage, setNewMessage] = useState("");
  const [onlineUsers, setOnlineUsers] = useState<any>([]);
  const location = useLocation();

  const [messages, setMessages] = useState<
    {
      conversationId: string;
      sender: { username: string; photourl: string; _id: string };
      text: string;
      _id: string;
      createdAt: string;
    }[]
  >([]);

  const scrollRef = useRef<HTMLDivElement>(null);
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    socket.emit("sendUser", {
      id: user.id,
      photourl: user.photourl,
      username: user.username,
    });
    socket.on("getUsers", (users: any) => {
      setOnlineUsers(users);
    });
  }, [user]);

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
  }, [user.id, currentChat]);

  useEffect(() => {
    let data = queryString.parse(location.search);

    let make = async () => {
      try {
        if (data.id) {
          let senderId = user.id;
          let recieverId = data.id;
          let conversation = await agent.chat.makeConversation({
            senderId,
            recieverId,
          });

          setCurrentChat(conversation);
        }
      } catch (error) {}
    };
    make();
  }, []);

  useEffect(() => {
    const getMessages = async () => {
      try {
        if (currentChat) {
          let messages = await agent.chat.getMessages(currentChat._id);
          setMessages(messages);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getMessages();
  }, [currentChat]);

  useEffect(() => {
    if (scrollRef && scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    if (socket) {
      socket.on("getMessage", ({ sender, text }: any) => {
        setArrivalMessage({
          sender,
          text,
          createdAt: Date.now(),
          conversationId: "",
          _id: uuidv4(),
        });
      });
    }
  }, []);

  useEffect(() => {
    if (currentChat) {
      arrivalMessage &&
        currentChat.members.includes(arrivalMessage.sender.id) &&
        setMessages((prev) => [...prev, arrivalMessage]);
    }
  }, [arrivalMessage, currentChat]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const createMessage = {
      conversationId: currentChat._id,
      text: newMessage,
      sender: user.id,
    };
    console.log(currentChat);
    socket.emit("sendMessage", {
      sender: { username: user.id, photourl: user.photourl, id: user.id },
      recieverId: currentChat.members.find(
        (member: string) => member !== user.id
      ),
      text: newMessage,
    });

    try {
      let data = await agent.chat.sendMessage(createMessage);
      setMessages([
        ...messages,
        {
          ...data,
          sender: {
            username: user.username,
            _id: user.id,
            photourl: user.photourl,
          },
        },
      ]);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MessengerContainer>
      <ChatBox>
        {currentChat ? (
          <>
            <MessagesWrapper>
              {messages.map((message) => (
                <div key={message._id} ref={scrollRef}>
                  <Message
                    conversationId={message.conversationId}
                    sender={message.sender}
                    own={message.sender._id === user.id && true}
                    text={message.text}
                    _id={message._id}
                    createdAt={message.createdAt}
                  />
                </div>
              ))}
            </MessagesWrapper>
            <Wrapper width="100%" flex="flex" align="center">
              <form
                onSubmit={handleSubmit}
                style={{ width: "100%", display: "flex", alignItems: "center" }}
              >
                <WriteMessage
                  cols={5}
                  rows={6}
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Say something"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSubmit(e);
                    }
                  }}
                />
                <Button type="submit" padding="10px" margin="" width="150px">
                  submit
                </Button>
              </form>
            </Wrapper>
          </>
        ) : (
          <h4> Open a conversation</h4>
        )}
      </ChatBox>
      <Wrapper width="fit-content">
        <ConversationContainer>
          <span>Conversations</span>
          {conversations &&
            conversations.map((c: any) => (
              <div
                style={{
                  cursor: "pointer",
                }}
                key={c._id}
                onClick={() => setCurrentChat(c)}
              >
                <ActiveConversation c={c} />
              </div>
            ))}
        </ConversationContainer>
        <ChatOnline
          users={onlineUsers}
          currentId={user.id}
          setCurrentChat={setCurrentChat}
        />
      </Wrapper>
    </MessengerContainer>
  );
};

export default Messenger;
