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
  @media screen and (max-width: 700px) {
    width: 100%;
    margin: 0;
    padding: 10px;
    margin: 20px 0;
  }
`;

export const List = styled.ul`
  list-style: none;
  @media screen and (max-width: 700px) {
    display: flex;
    width: 100%;
    overflow: auto;
    align-items: center;
  }
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

  @media screen and (max-width: 700px) {
    padding-right: 15px;
  }
`;
