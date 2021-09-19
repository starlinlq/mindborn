import styled from "styled-components";
export const SearchWrapper = styled.div`
  border: 1px solid transparent;
  background-color: #eff6ff;
  width: 400px;
  height: 35px;
  display: flex;
  align-items: center;
  margin-right: 20px;
  border-radius: 10px;

  @media screen and (max-width: 450px) {
    width: 150px;
  }
`;
export const Input = styled.input`
  padding-left: 10px;
  width: 100%;
  height: 100%;
  background-color: #eff6ff;
  border-radius: 10px;
  border: none;
`;
