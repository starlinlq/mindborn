import {
  Brand,
  Nav,
  NavWrapper,
  Account,
  Img,
  Details,
  DetailsWrapper,
  Notifications,
  Content,
  Name,
  Picture,
  Notify,
} from "./nav.styles";
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Wrapper,
  Container,
  Button,
  Link,
  List,
  To,
  RowCenter,
} from "../../styles/global";
import { GiAnubis, GiCircle } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { VscAccount, VscHome } from "react-icons/vsc";
import { CgProfile } from "react-icons/cg";
import { IoNotificationsOutline } from "react-icons/io5";
import SearchBar from "../searchbar/Search";
import agent from "../../api/agent";
import { toast } from "react-toastify";
import * as actionTypes from "../../store/user/actionType";
import { Dispatch } from "redux";

function NavBar() {
  const { user } = useSelector((state: RootState) => state);
  const [display, setDisplay] = useState(false);
  const { notifications } = useSelector((state: RootState) => state.user);
  const [showNotification, setShowNotification] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch<Dispatch<any>>();

  const handleActiveEnter = () => {
    setDisplay(true);
  };

  const handleActiveLeave = () => {
    setDisplay(false);
  };

  function handleClick(e: any) {
    if (ref.current && ref.current.contains(e.target)) {
      setShowNotification(true);
      dispatch({ type: actionTypes.READ_NOTIFICATIONS, payload: true });
    } else {
      setShowNotification(false);
    }
  }

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => document.removeEventListener("click", handleClick);
  }, []);

  useEffect(() => {
    dispatch({ type: actionTypes.READ_NOTIFICATIONS, payload: false });
  }, [user.notifications.length, dispatch]);

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
            <Wrapper width="fit-content" style={{ position: "relative" }}>
              {!user.notifications_read && <Notify></Notify>}
              <div ref={ref}>
                <IoNotificationsOutline
                  style={{
                    color: "grey",
                    fontSize: "20px",
                    marginRight: "20px",
                    cursor: "pointer",
                  }}
                />
              </div>
              {showNotification && (
                <Notifications>
                  {notifications.map((data) => (
                    <Wrapper
                      key={uuidv4()}
                      width="100%"
                      flex="flex"
                      align="center"
                      style={{ marginBottom: "10px" }}
                    >
                      <Picture src={data.sender.photourl} />
                      <div style={{ marginLeft: "10px" }}>
                        <a
                          style={{ textDecoration: "none" }}
                          href={`/profile/${data.sender._id}`}
                        >
                          <Name>{data.sender.username}</Name>
                        </a>
                        <Content to={`/post/${data.belongsTo}`}>
                          {data.notification}
                        </Content>
                      </div>
                    </Wrapper>
                  ))}
                </Notifications>
              )}
            </Wrapper>

            {user.isAuth ? (
              <Account
                onMouseEnter={handleActiveEnter}
                onMouseLeave={handleActiveLeave}
              >
                <Img src={user.photourl} />
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
