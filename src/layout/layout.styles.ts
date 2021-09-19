import styled from "styled-components";

export const LayoutWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 80px;
  width: 100%;
`;

export const SettingsContainer = styled.div`
  width: 90%;
  margin-left: 25px;
  background-color: ${({ theme }) => theme.main};
  border-radius: 10px;
  min-height: 500px;
`;
type OptionProps = {
  active: boolean;
};
export const Option = styled.h4<OptionProps>`
  margin: 0 20px;
  font-weight: 100;
  cursor: pointer;
  padding: 6px;
  font-family: ${({ theme }) => theme.primaryFont};
  border-bottom: ${({ active }) => (active ? "4px solid black" : "")};
`;
