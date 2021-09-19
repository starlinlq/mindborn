import styled from "styled-components";

export const DeleteContainer = styled.div`
  position: relative;
`;

export const Delete = styled.button`
  border: 1px solid red;
  background: transparent;
  border-radius: 5px;
  padding: 2px;
  cursor: pointer;
  width: 80px;
`;

export const Confirm = styled.button`
  margin-top: 5px;
  padding: 2px 5px;
  background: transparent;
  border: 1px solid black;
  cursor: pointer;
  width: 40px;
`;
export const ConfirmWrapper = styled.div`
  top: 20px;
  right: 45px;
  position: absolute;
  width: 100px;

  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;
