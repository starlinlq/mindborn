import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import agent from "../../api/agent";
import { Wrapper } from "../../styles/global";
import { DisplayUserWrapper, Name, P, UserPhoto } from "./styles";
import queryString from "query-string";

export default function DisplayUserSearch() {
  const location = useLocation();
  const [state, setState] = useState<any>(null);
  const { q } = queryString.parse(location.search);
  useEffect(() => {
    const getData = async () => {
      try {
        let data = await agent.user.searchProfile(q);
        console.log(data);
        setState(data);
      } catch (error) {}
    };
    getData();
  }, [q]);
  return (
    <DisplayUserWrapper>
      <Wrapper width="100%">
        <P>USERS</P>
      </Wrapper>
      <Wrapper width="100%">
        {state &&
          state.length > 0 &&
          state.map((user: any) => (
            <Wrapper
              width="100%"
              style={{ margin: "10px 0" }}
              flex="flex"
              align="center"
              key={user._id}
            >
              <UserPhoto src={user.photourl} />
              <a href={`/profile/${user._id}`}>
                {" "}
                <Name> {user.username}</Name>
              </a>
            </Wrapper>
          ))}
        {state && state.length === 0 && <P>No users found</P>}
      </Wrapper>
    </DisplayUserWrapper>
  );
}
