import styled from "styled-components";
import { BottomShadow } from "../../styles/global";

export const Nav = styled.nav`
  height: 55px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  color: ${({ theme }) => theme.main};
`;

export const NavWrapper = styled(BottomShadow)`
  width: 100%;
  border-bottom: 1px solid transparent;
`;

export const Brand = styled.p`
  font-weight: bold;
  font-family: ${({ theme }) => theme.primaryFont};
  letter-spacing: ${({ theme }) => theme.letterSpacing};
  color: ${({ theme }) => (theme.main === "white" ? "black" : "white")};
`;
