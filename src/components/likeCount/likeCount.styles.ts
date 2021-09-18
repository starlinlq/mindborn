import styled from "styled-components";

export const Count = styled.span`
  margin-left: 2px;
  height: 100%;
  border-left: 1px solid lightgrey;
  padding-left: 10px;
`;

type LikeProps = {
  liked: boolean;
};

export const Like = styled.div`
  color: grey;
  margin-right: 10px;
  border: 1px solid gray;
  border-radius: 10px;
  padding: 2px 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  z-index: 1;

  &:hover {
    color: red;
  }
`;
