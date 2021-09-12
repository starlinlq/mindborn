import styled from "styled-components";

export const Nav = styled.nav`
  height: 55px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  color: ${({ theme }) => theme.main};
`;

export const NavWrapper = styled.div`
  width: 100%;
  border-bottom: 1px solid transparent;
  -webkit-box-shadow: 0 4px 6px -6px #222;
  -moz-box-shadow: 0 4px 6px -6px #222;
  box-shadow: 0 4px 6px -6px #222;
`;

export const Brand = styled.p`
  font-weight: bold;
  font-family: ${({ theme }) => theme.primaryFont};
  letter-spacing: ${({ theme }) => theme.letterSpacing};
  color: ${({ theme }) => (theme.main === "white" ? "black" : "white")};
`;
