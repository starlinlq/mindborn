import styled from "styled-components";

export const CategoryListWrapper = styled.div`
  margin-top: 10px;
  height: fit-content;
  width: 200px;
  height: fit-content;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  background-color: ${({ theme }) => theme.main};
  padding: 10px 15px;
  border-radius: 10px;
`;

export const List = styled.ul`
  list-style: none;
`;

type ItemProps = {
  selected: boolean;
};
export const Item = styled.li<ItemProps>`
  text-align: center;
  font-family: ${({ theme }) => theme.primaryFont};
  cursor: pointer;
  font-weight: normal;
  color: ${({ selected }) => (selected ? "blue" : "black")};

  &:hover {
    color: blue;
  }
`;
