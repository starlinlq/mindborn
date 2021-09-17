import styled from "styled-components";

export const SinglePostWrapper = styled.div`
  background-color: ${({ theme }) => theme.main};
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  padding: 15px;
  border-radius: 10px;
`;

export const AuthorSection = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;

  width: fit-content;
`;

export const Description = styled.div`
  font-family: ${({ theme }) => theme.titleFont};
  font-weight: 100;
  font-size: 15px;
  letter-spacing: 0.03em;
  line-height: 21px;
  margin: 10px 0;
`;
