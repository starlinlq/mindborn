import { useEffect, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
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
        let { data } = await agent.user.getFollowing(id);
        console.log(data);
        setState(data);
      } catch (error) {}
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
