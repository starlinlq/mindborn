import styled from "styled-components";
import { BottomShadow } from "../../styles/global";

export const Nav = styled.nav`
  height: 55px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  color: ${({ theme }) => theme.main};
`;

export const NavWrapper = styled(BottomShadow)`
  width: 100%;
  background-color: ${({ theme }) => theme.main};
  position: fixed;
  top: 0;
`;

export const Img = styled.img`
  width: 35px;
  height: 35px;
  object-position: center;
  object-fit: cover;
  border-radius: 10px;
  cursor: pointer;
`;

export const Details = styled.div`
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  background-color: ${({ theme }) => theme.main};
  margin-top: 26px;
  width: inherit;
  height: fit-content;
  padding: 10px;
  border-radius: 10px;
  z-index: 999;
`;

export const DetailsWrapper = styled.div`
  position: absolute;
  height: fit-content;
  width: 150px;
  top: 25px;
  right: 0px;
  display: flex;
  justify-content: center;
  z-index: 999;
`;

export const Account = styled.div`
  color: ${({ theme }) => theme.secondary};
  position: relative;
  height: 100%;
`;

export const Brand = styled.p`
  font-weight: bold;
  font-family: ${({ theme }) => theme.primaryFont};
  letter-spacing: ${({ theme }) => theme.letterSpacing};
  font-size: 17px;
  color: ${({ theme }) => (theme.main === "white" ? "black" : "white")};
`;
