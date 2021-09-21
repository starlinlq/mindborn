import styled from "styled-components";
import { Wrapper } from "../../styles/global";
export const MenuWrapper = styled.div`
  height: fit-content;
  width: 200px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  background-color: ${({ theme }) => theme.main};
  padding: 10px 15px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 700px) {
    display: none;
  }
`;

export const List = styled(Wrapper)`
  padding-bottom: 10px;
  margin: 10px 0;
  border-bottom: 1px solid #eff6ff;
  @media screen and (max-width: 700px) {
    margin: 5px;
    border-bottom: none;
    padding: 0;
  }
`;

type TitleProps = {
  active?: boolean;
};

export const Title = styled.a<TitleProps>`
  text-decoration: none;
  color: ${({ theme, active }) => (active ? "blue" : theme.secondary)};
  font-family: ${({ theme }) => theme.primaryFont};
  padding-left: 10px;
  cursor: pointer;
  &:hover {
    color: blue;
  }
`;
