import styled from "styled-components";

export const DisplayUserWrapper = styled.div`
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  background-color: ${({ theme }) => theme.main};
  border-radius: 10px;
  padding: 10px;
  height: 200px;
  overflow: auto;
  margin-bottom: 20px;
`;

export const P = styled.p`
  font-family: ${({ theme }) => theme.primaryFont};
`;

export const UserPhoto = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  object-fit: cover;
`;

export const Name = styled.p`
  margin-left: 5px;
  &:hover {
    border-bottom: 1px solid blue;
    cursor: pointer;
  }
`;
