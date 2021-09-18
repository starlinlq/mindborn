import styled from "styled-components";

export const FollowDataContainer = styled.div`
  width: 400px;
  height: 400px;
  overflow: auto;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  background-color: white;
  position: fixed;
  top: 50%;
  left: 50%;
  /* bring your own prefixes */
  transform: translate(-50%, -50%);
  padding: 25px;
  border-radius: 10px;
`;

export const Photo = styled.img`
  width: 40px;
  height: 40px;
  object-fit: cover;
  object-position: center;
`;
export const Name = styled.p`
  color: black;
  margin-left: 10px;
  font-family: ${({ theme }) => theme.primaryFont};
`;

export const Close = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
  font-size: 20px;
  color: ${({ theme }) => theme.secondary};
  cursor: pointer;

  &:hover {
    color: red;
  }
`;
