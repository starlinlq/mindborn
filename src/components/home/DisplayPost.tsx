import Layout from "../../layout/Home";
import { Wrapper } from "../../styles/global";
import Post from "../post/Post";

export default function DisplayPost() {
  return (
    <Wrapper width="100%">
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
    </Wrapper>
  );
}
