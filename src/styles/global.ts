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

export const BottomShadow = styled.div`
  -webkit-box-shadow: 0 4px 6px -6px #222;
  -moz-box-shadow: 0 4px 6px -6px #222;
  box-shadow: 0 4px 6px -6px #222;
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

export const Link = styled.a`
  text-decoration: none;
`;

export const Form = styled.form`
  width: 420px;
  padding: 40px 25px;
  border: 1px solid transparent;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  border-radius: 10px;
`;

export const FormTitle = styled.h3`
  color: ${({ theme }) => theme.secondary};
  padding-bottom: 10px;
`;

type InputTypes = {
  borderColor?: string;
};
export const Input = styled.input<InputTypes>`
  border: 1px solid transparent;
  background-color: white;
  border-color: ${({ borderColor }) => borderColor};

  width: 100%;
  padding: 15px 5px;
  border-radius: 10px;
`;
export const Label = styled.label`
  color: orangered;
  width: fit-content;
  font-size: 12px;
  position: absolute;
  bottom: 0;
`;

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #eff6ff;
  border-radius: 10px;
  width: 100%;
  margin: 10px 0;
  background-color: white;
`;
export const IconWrapper = styled.div`
  padding: 0 6px;
  color: #6ea8f7;
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

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  animation: ${rotate360} 1s linear infinite;
  transform: translateZ(0);

  border-top: 2px solid grey;
  border-right: 2px solid grey;
  border-bottom: 2px solid grey;
  border-left: 4px solid black;
  background: transparent;
  width: 100px;
  height: 100px;
  border-radius: 50%;
`;

export default Spinner;