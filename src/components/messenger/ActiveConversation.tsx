import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { match } from "react-router-dom";
import agent from "../../api/agent";
import { RootState } from "../../store/store";
import { Wrapper } from "../../styles/global";
import { SearchFriends, Photo, Name } from "./messenger.styles";

const ActiveConversation = ({ c }: any) => {
  const [user, setUser] =
    useState<{ username: string; photourl: string; _id: string }>();
  const { id } = useSelector((state: RootState) => state.user);

  console.log(c);

  useEffect(() => {
    const friendId = c.members.filter((match: any) => match !== id);
    async function get() {
      try {
        let res = await agent.user.getUser(friendId);
        setUser(res);
      } catch (error) {
        console.log(error);
      }
    }
    get();
  }, []);

  return (
    <>
      {user && (
        <Wrapper
          width="fit-content"
          flex="flex"
          align="center"
          style={{ margin: "10px 0" }}
        >
          <Photo src={user.photourl} />
          <Name>{user.username}</Name>
        </Wrapper>
      )}
    </>
  );
};

export default ActiveConversation;
