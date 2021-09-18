import styled from "styled-components";
export const ProfileCardContainer = styled.div`
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  background-color: ${({ theme }) => theme.main};
  width: 100%;
  border-radius: 5px;
  padding: 15px;
  color: ${({ theme }) => theme.secondary};
  position: relative;
`;

export const Photo = styled.img`
  width: inherit;
  height: 180px;
  object-fit: cover;
  object-position: center;
  border-radius: 5px;
`;

export const Name = styled.p`
  font-size: 18px;
  width: 100%;
  text-align: center;
  font-family: ${({ theme }) => theme.primaryFont};
  margin: 10px 0;
`;

export const Span = styled.span`
  color: grey;
`;

export const Followers = styled.p`
  font-size: 14px;
  cursor: pointer;
`;
export const Following = styled(Followers)``;
export const Bio = styled.p`
  word-wrap: break-word;
  max-height: 200px;
  overflow-y: auto;
  margin: 10px 0;
`;

export const Location = styled.p`
  margin: 10px 0;
`;

export const EditProfile = styled.div`
  position: absolute;

  color: white;
  font-size: 25px;
  top: 0;
  right: 0;
  cursor: pointer;
  width: fit-content;
  background-color: black;
  border-bottom-left-radius: 10px;
`;
