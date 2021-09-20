import styled from "styled-components";

export const MessengerContainer = styled.div`
  width: 100%;
  margin-left: 25px;
  border-radius: 10px;

  display: flex;
  justify-content: space-between;
`;

const BoxShadow = styled.div`
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  background-color: white;
  border-radius: 10px;
`;
export const Online = styled(BoxShadow)`
  padding: 10px;
`;
export const ChatBox = styled(BoxShadow)`
  width: 55%;
  padding: 10px;
  display: flex;
  flex-direction: column;
`;
export const ConversationContainer = styled(BoxShadow)`
  padding: 10px;
  width: 20%;
  height: fit-content;
`;
export const SearchFriends = styled.input``;
export const Photo = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
`;
export const Name = styled.p`
  margin-left: 10px;
`;

export const Text = styled.p`
  background-color: #01b1f7;
  border-radius: 10px;
  width: 300px;
  color: white;
  padding: 10px;
  margin-left: 8px;
  margin-top: 5px;
`;

export const Lastseen = styled.p`
  margin-top: 10px;
`;
type Props = {
  own: boolean | undefined;
};
export const MessageContainer = styled.div<Props>`
  display: flex;
  justify-content: ${({ own }) => own && "flex-end"};
`;

export const WriteMessage = styled.textarea`
  margin: 10px 0;
  width: 100%;
  margin-right: 10px;
`;
export const MessagesWrapper = styled.div`
  height: 400px;
  overflow: auto;
`;

type IsOnlineProps = {
  active: boolean | undefined;
};
export const IsOnline = styled.div`
  color: green;
`;
