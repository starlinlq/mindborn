import styled, { createGlobalStyle, keyframes } from "styled-components";

export const GlobalStyles = createGlobalStyle`
*{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}

body{
    background-color: ${({ theme }) => theme.background};
}
`;
type WrapperTypes = {
  width: string;
  flex?: boolean;
  alingCenter?: boolean;
};
export const Wrapper = styled.div<WrapperTypes>`
  width: ${({ width }) => width};
  display: ${({ flex }) => (flex ? "flex" : "block")};
`;
type ButtonTypes = {
  width: string;
  main?: boolean;
  margin: string;
  padding: string;
};
export const Button = styled.button<ButtonTypes>`
  color: ${({ theme }) => theme.main};
  background-color: ${(props) => (props.main ? "#3D5CF0" : "black")};
  width: ${({ width }) => width};
  height: fit-content;
  margin: 0 ${({ margin }) => margin};
  border: 1px solid transparent;
  padding: ${({ padding }) => padding} 0;
  border-radius: 12px;
  font-family: ${({ theme }) => theme.primaryFont};
  letter-spacing: ${({ theme }) => theme.letterSpacing};
  transition: 200ms;
  cursor: pointer;
  &:hover {
    border-color: black;
    background-color: transparent;
    color: blue;
  }
`;

export const Container = styled.div`
  padding-right: 10px;
  padding-left: 10px;
  margin-right: auto;
  margin-left: auto;

  @media (min-width: 768px) {
    width: 750px;
  }
  @media (min-width: 992px) {
    width: 970px;
  }
  @media (min-width: 1200px) {
    width: 1170px;
  }
`;
