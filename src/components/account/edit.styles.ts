import styled from "styled-components";
export const EditAccountContainer = styled.div`
  width: 50%;
  position: relative;
  padding: 15px;
`;
export const EditProfileContainer = styled.div`
  padding: 15px;
`;

export const Form = styled.form`
  width: 420px;
  height: fit-content;
  position: fixed;
  top: 25%;
  left: 50%;
  /* bring your own prefixes */
  transform: translate(-50%, -50%);
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  z-index: 999;
  background: white;
  padding: 20px;
`;

export const ShadowContainer = styled.div`
  position: absolute;
  height: 100vh;
  width: 100vh;
  background-color: #1c1c1c;
`;

export const Div = styled.div`
  border: 1px solid grey;
  border-radius: 10px;
  margin: 10px 0;
`;
