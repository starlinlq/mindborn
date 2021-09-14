import { Brand, Nav, NavWrapper } from "./nav.styles";
import React from "react";
import { Wrapper, Container, Button, Link } from "../../styles/global";
import { GiAnubis } from "react-icons/gi";

function NavBar() {
  return (
    <NavWrapper>
      <Container>
        <Nav>
          <Wrapper width="120px" flex>
            <GiAnubis style={{ color: "blue", marginRight: "2px" }} />
            <Link href="/">
              {" "}
              <Brand>Spacepark</Brand>
            </Link>
          </Wrapper>
          <Wrapper width="fit-content">
            <Link href="/register">
              <Button
                type="button"
                width="100px"
                main
                margin="5px"
                padding="7px"
              >
                Register
              </Button>
            </Link>
            <Link href="/login">
              <Button width="100px" margin="5px" padding="7px">
                Sign in
              </Button>
            </Link>{" "}
          </Wrapper>
        </Nav>
      </Container>
    </NavWrapper>
  );
}

export default NavBar;
