import React, { useState, useEffect } from "react";
import { Online, Photo, Name, IsOnline } from "./messenger.styles";
import { Wrapper } from "../../styles/global";
import { VscCircleFilled } from "react-icons/vsc";
import agent from "../../api/agent";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

type User = {
  username: string;
  id: string;
  photourl: string;
  socketId: string;
};
type Props = {
  users: User[];
  currentId: string;
  setCurrentChat: Function;
};
const ChatOnline = ({ users, currentId, setCurrentChat }: Props) => {
  const [onlineFriends, setOnlineFriends] = useState<User[]>();

  const handleClick = async (id: string) => {
    try {
      let test = await agent.chat.getConversation(currentId, id);
      setCurrentChat(test);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getFollowing = async () => {
      let online: {
        username: string;
        id: string;
        photourl: string;
        socketId: string;
      }[] = [];
      try {
        let { data } = await agent.user.getFollowing(currentId);

        users.forEach((user) => {
          for (let x = 0; x < data.length; x++) {
            if (
              user.id === data[x].following_id._id &&
              !online.find((match) => match.id === data[x].following_id._id)
            ) {
              online.push(user);
            }
          }
        });

        setOnlineFriends(online);
      } catch (error: any) {
        toast.error(error.message);
      }
    };
    if (currentId) {
      getFollowing();
    }
  }, [currentId, users]);
  return (
    <Online>
      <span>Online</span>
      {onlineFriends &&
        onlineFriends.map((friend) => (
          <Wrapper
            onClick={() => handleClick(friend.id)}
            key={uuidv4()}
            width="fit-content"
            flex="flex"
            align="center"
            style={{ margin: "10px 0", cursor: "pointer" }}
          >
            <Photo src="https://meetanentrepreneur.lu/wp-content/uploads/2019/08/profil-linkedin.jpg" />
            <Name>{friend.username}</Name>
            <IsOnline>
              <VscCircleFilled />
            </IsOnline>
          </Wrapper>
        ))}
      {onlineFriends && onlineFriends.length === 0 && <p>No online friends</p>}
    </Online>
  );
};

export default ChatOnline;
