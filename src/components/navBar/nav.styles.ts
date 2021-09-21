import styled from "styled-components";
import { BottomShadow } from "../../styles/global";
import { Link } from "react-router-dom";

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
  z-index: 999;
`;

export const Notifications = styled.div`
  position: absolute;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  width: 250px;
  right: 20px;
  margin-top: 20px;
  height: 250px;
  overflow: auto;
  color: black;

  padding: 10px;
  border-radius: 10px;
`;
export const Name = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.secondary};
`;
export const Picture = styled.img`
  width: 35px;
  height: 35px;
  object-fit: cover;
  border-radius: 5px;
`;
export const Content = styled(Link)`
  font-size: 14px;
  color: grey;
  color: blue;
  text-decoration: none;
`;

export const Notify = styled.div`
  background-color: red;
  height: 7px;
  width: 7px;
  border-radius: 50%;
  top: 2px;
  right: 22px;
  position: absolute;
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
