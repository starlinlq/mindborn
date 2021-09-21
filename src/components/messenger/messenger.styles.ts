import styled from "styled-components";

export const MessengerContainer = styled.div`
  width: 100%;
  margin-left: 25px;
  border-radius: 10px;

  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 700px) {
    flex-direction: column;
    margin: 0;
    justify-content: initial;
  }
`;

const BoxShadow = styled.div`
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  background-color: white;
  border-radius: 10px;
`;
export const Online = styled(BoxShadow)`
  padding: 10px;
  margin: 10px 0;
  height: 220px;
  width: 205px;
  overflow: auto;

  @media screen and (max-width: 700px) {
    width: 100%;
  }
`;
export const ChatBox = styled(BoxShadow)`
  padding: 25px;
  width: 76%;
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 700px) {
    width: 100%;
    margin: 10px 0;
  }
`;
export const ConversationContainer = styled(BoxShadow)`
  padding: 10px;
  overflow: auto;
  height: 220px;
`;
export const SearchFriends = styled.input``;
export const Photo = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
`;
export const Name = styled.p`
  margin-left: 10px;
`;

export const Text = styled.p`
  background-color: #01b1f7;
  border-radius: 10px;
  max-width: 300px;
  height: fit-content;
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
  padding: 10px;
  width: 100%;
  margin-right: 10px;
  border: 1px solid lightgrey;
  border-radius: 10px;
`;
export const MessagesWrapper = styled.div`
  height: 300px;
  overflow: auto;
`;

type IsOnlineProps = {
  active: boolean | undefined;
};
export const IsOnline = styled.div`
  color: green;
`;
