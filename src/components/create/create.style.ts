import styled from "styled-components";

export const CreateWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const Form = styled.form`
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  padding: 15px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.main};
  width: 100%;
`;
export const Description = styled.textarea`
  width: 100%;
  border: 1px solid #eff6ff;
  border-radius: 10px;
  padding-left: 10px;
  margin-bottom: 10px;
  padding-top: 10px;
`;

export const Category = styled.select`
  border: 1px solid #eff6ff;
  border-radius: 10px;
  padding: 10px;
`;
export const Option = styled.option``;
