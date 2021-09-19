import {
  Brand,
  Nav,
  NavWrapper,
  Account,
  Img,
  Details,
  DetailsWrapper,
} from "./nav.styles";
import { useState } from "react";
import {
  Wrapper,
  Container,
  Button,
  Link,
  List,
  To,
  RowCenter,
} from "../../styles/global";
import { GiAnubis } from "react-icons/gi";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { VscAccount, VscHome } from "react-icons/vsc";
import { CgProfile } from "react-icons/cg";
import { IoNotificationsOutline } from "react-icons/io5";
import SearchBar from "../searchbar/Search";

function NavBar() {
  const { user } = useSelector((state: RootState) => state);
  const [display, setDisplay] = useState(false);

  const handleActiveEnter = () => {
    setDisplay(true);
  };

  const handleActiveLeave = () => {
    setDisplay(false);
  };

  return (
    <NavWrapper>
      <Container>
        <Nav>
          <Wrapper width="120px" flex="block" align="center">
            <Link href="/">
              <GiAnubis style={{ color: "blue", marginRight: "2px" }} />
              <Brand>Spacepark</Brand>
            </Link>
          </Wrapper>
          <Wrapper width="fit-content">
            <SearchBar />
          </Wrapper>

          <Wrapper flex="flex" align="center" width="fit-content">
            {user.isAuth && (
              <IoNotificationsOutline
                style={{ color: "grey", fontSize: "20px", marginRight: "20px" }}
              />
            )}
            {user.isAuth ? (
              <Account
                onMouseEnter={handleActiveEnter}
                onMouseLeave={handleActiveLeave}
              >
                <Img src={`${user.photourl}`} />
                {display && (
                  <>
                    <DetailsWrapper>
                      <Details>
                        <List>
                          <RowCenter>
                            <VscHome /> <To href="/">Home</To>
                          </RowCenter>
                          <RowCenter>
                            <CgProfile />{" "}
                            <To href={`/profile/${user.id}`}>Profile</To>
                          </RowCenter>
                          <RowCenter>
                            <VscAccount /> <To href="/account">Account</To>
                          </RowCenter>
                        </List>
                      </Details>
                    </DetailsWrapper>
                  </>
                )}
              </Account>
            ) : (
              <>
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
                </Link>
              </>
            )}
          </Wrapper>
        </Nav>
      </Container>
    </NavWrapper>
  );
}

export default NavBar;
