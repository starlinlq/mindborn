import styled from "styled-components";

export const FilterWrapper = styled.div`
  width: 100%;
  height: 45px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  display: flex;
  align-items: center;
  padding-left: 10px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.main};

  @media screen and (max-width: 1200px) {
    width: 92%;
    margin: 0 20px;
    padding-left: 10px;
  }
  @media screen and (max-width: 700px) {
    width: 100%;
    margin: 0;
  }
`;

export const Type = styled.span`
  font-family: ${({ theme }) => theme.primaryFont};
  margin-left: 5px;
  color: ${({ theme }) => theme.secondary};
`;
type SelectedProps = {
  selected: boolean;
};
export const Selected = styled.div<SelectedProps>`
  background-color: ${({ selected }) => selected && "#eff6ff"};
  display: flex;
  align-items: center;
  border-radius: 10px;
  padding: 5px 10px;
  margin-right: 10px;
  cursor: pointer;
  &:hover {
    background-color: #eff6ff;
  }
`;
