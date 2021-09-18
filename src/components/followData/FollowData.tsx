import { useEffect, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { toast } from "react-toastify";
import agent from "../../api/agent";
import { history } from "../../App";
import { Wrapper } from "../../styles/global";
import { Close, FollowDataContainer, Name, Photo } from "./followData.styles";

type Props = {
  name: string;
  id: string;
  setDisplay: Function;
};
export default function FollowData({ name, id, setDisplay }: Props) {
  const [state, setState] = useState<any | null>(null);
  useEffect(function () {
    async function get() {
      try {
        if (name === "following") {
          let { data } = await agent.user.getFollowing(id);
          console.log(data);
          setState(data);
          return;
        }
        let { data } = await agent.user.getFollowers(id);
        console.log(data);

        setState(data);
        return;
      } catch (error: any) {
        toast.error(error.message);
      }
    }
    get();
  }, []);
  const handleClose = () => {
    setDisplay(false);
  };
  const handleClick = (id: string) => {
    setDisplay(false);
    history.push(`/profile/${id}`);
  };
  return (
    <FollowDataContainer>
      <Wrapper
        width="100%"
        style={{ textAlign: "center", marginBottom: "10px" }}
      >
        <h4>{name.toUpperCase()}</h4>
        <Close onClick={handleClose}>
          <AiOutlineCloseCircle />
        </Close>
      </Wrapper>
      <Wrapper width="100%">
        {state &&
          name === "followers" &&
          state.map((user: any) => (
            <Wrapper
              onClick={() => handleClick(user.follower_id._id)}
              style={{
                cursor: "pointer",
                border: "1px solid grey",
                margin: "10px 0",
              }}
              width="100%"
              key={user.follower_id._id}
              flex="flex"
              align="center"
            >
              <Photo src={`${user.follower_id.photourl}`} />
              <Name>{user.follower_id.username}</Name>
            </Wrapper>
          ))}
        {state &&
          name === "following" &&
          state.map((user: any) => (
            <Wrapper
              onClick={() => handleClick(user.following_id._id)}
              style={{
                cursor: "pointer",
                border: "1px solid grey",
                margin: "10px 0",
              }}
              width="100%"
              key={user.following_id._id}
              flex="flex"
              align="center"
            >
              <Photo src={`${user.following_id.photourl}`} />
              <Name>{user.following_id.username}</Name>
            </Wrapper>
          ))}
      </Wrapper>
    </FollowDataContainer>
  );
}
