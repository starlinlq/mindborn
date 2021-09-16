import styled from "styled-components";
export const PostWrapper = styled.div`
  margin: 20px 0;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  background-color: ${({ theme }) => theme.main};
  width: 100%;
  border-radius: 5px;
  padding: 15px;
  cursor: pointer;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 15px;
  }
`;

export const AuthorWrapper = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
  cursor: pointer;
  margin-bottom: 10px;
`;
export const Author = styled.h5`
  font-family: ${({ theme }) => theme.primaryFont};
  color: gray;
  margin-left: 5px;
  letter-spacing: 0.05em;

  &:hover {
    text-decoration: underline;
  }
`;
export const Photo = styled.img`
  border-radius: 50%;
  width: 25px;
  height: 25px;
  object-fit: cover;
  object-position: center;
`;

export const Title = styled.h1`
  font-family: ${({ theme }) => theme.primaryFont};
  font-weight: normal;
  font-size: 20px;
  letter-spacing: 0.03em;
`;

export const Topic = styled.p`
  font-size: 12px;
  margin-left: 5px;
  background-color: #eff6ff;
  padding: 5px;
  border-radius: 10px;
  letter-spacing: 0.03em;
  font-family: ${({ theme }) => theme.primaryFont};
`;

export const Description = styled.p`
  font-family: ${({ theme }) => theme.titleFont};
  font-weight: 100;
  font-size: 15px;
  letter-spacing: 0.03em;
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  line-height: 21px;
  margin: 15px 0;
`;

export const Comments = styled.div`
  display: flex;
  align-items: center;
  color: grey;
  border: 1px solid gray;
  border-radius: 10px;
  padding: 0px 10px;
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.secondary};
  }
`;
export const Count = styled.span`
  margin-left: 2px;
  height: 100%;
  border-left: 1px solid lightgrey;
  padding-left: 10px;
`;

export const Like = styled.div`
  color: grey;
  margin-right: 10px;
  border: 1px solid gray;
  border-radius: 10px;
  padding: 2px 5px;
  cursor: pointer;

  display: flex;
  align-items: center;

  &:hover {
    color: ${({ theme }) => theme.secondary};
  }
`;
