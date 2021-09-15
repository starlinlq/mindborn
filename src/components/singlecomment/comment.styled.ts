import styled from "styled-components";

export const CommentWrapper = styled.div`
  margin: 20px 0;
`;

export const Content = styled.p`
  font-family: ${({ theme }) => theme.titleFont};
  font-weight: 100;
  font-size: 15px;
  letter-spacing: 0.03em;
  line-height: 21px;
  padding: 10px;
  border-left: 2px solid #eff6ff;
`;

export const Date = styled.div`
  margin-left: 10px;
  font-size: 14px;
  color: grey;
`;
export const Reply = styled.span`
  font-size: 14px;
  cursor: pointer;
  font-family: ${({ theme }) => theme.primaryFont};
`;

export const ChildrenWrapper = styled.div`
  margin: 20px;
  border-left: 2px solid #eff6ff;
  padding-left: 5px;
`;
