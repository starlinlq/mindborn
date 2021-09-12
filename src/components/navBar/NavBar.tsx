import { Brand, Nav, NavWrapper } from "./nav.styles";
import React from "react";
import { Wrapper, Container, Button } from "../../styles/global";
import { GiAnubis } from "react-icons/gi";

function NavBar() {
  return (
    <NavWrapper>
      <Container>
        <Nav>
          <Wrapper width="120px" flex>
            <GiAnubis style={{ color: "blue", marginRight: "2px" }} />
            <Brand>Spacepark</Brand>
          </Wrapper>
          <Wrapper width="fit-content">
            <Button width="100px" main margin="5px" padding="7px">
              Register
            </Button>
            <Button width="100px" margin="5px" padding="7px">
              Sign in
            </Button>{" "}
          </Wrapper>
        </Nav>
      </Container>
    </NavWrapper>
  );
}

export default NavBar;
