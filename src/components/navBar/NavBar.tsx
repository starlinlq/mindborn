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
import { GiAnubis } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { VscAccount, VscHome } from "react-icons/vsc";
import { CgProfile } from "react-icons/cg";
import { IoNotificationsOutline } from "react-icons/io5";
import SearchBar from "../searchbar/Search";
import * as actionTypes from "../../store/user/actionType";
import { Dispatch } from "redux";
import { history } from "../../App";
import { BiMessage } from "react-icons/bi";
import { FiBookmark } from "react-icons/fi";

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

  const handleLogOut = () => {
    dispatch({ type: actionTypes.LOG_OUT_USER });
    history.push("/");
  };

  return (
    <NavWrapper>
      <Container>
        <Nav>
          <Wrapper width="120px" flex="block" align="center">
            <Link href="/home">
              <GiAnubis style={{ color: "blue", marginRight: "2px" }} />
              <Brand>MindBorn</Brand>
            </Link>
          </Wrapper>
          {user.isAuth && (
            <Wrapper width="fit-content">
              <SearchBar />
            </Wrapper>
          )}

          <Wrapper
            flex="flex"
            align="center"
            content="space-between"
            width="fit-content"
          >
            <div style={{ position: "relative" }}>
              {user.isAuth && (
                <>
                  <div ref={ref} style={{ position: "relative" }}>
                    {!user.notifications_read && <Notify></Notify>}
                    <IoNotificationsOutline
                      style={{
                        color: "grey",
                        fontSize: "20px",
                        marginRight: "20px",
                        cursor: "pointer",
                      }}
                    />
                  </div>
                </>
              )}
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
            </div>

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
                            <VscHome /> <To href="/home">Home</To>
                          </RowCenter>
                          <RowCenter>
                            <CgProfile />{" "}
                            <To href={`/profile/${user.id}`}>Profile</To>
                          </RowCenter>
                          {window.innerWidth < 700 && (
                            <>
                              <RowCenter>
                                <BiMessage /> <To href="/messages">Message</To>
                              </RowCenter>
                              <RowCenter>
                                <FiBookmark />{" "}
                                <To href="/bookmark">Bookmark</To>
                              </RowCenter>
                            </>
                          )}
                          <RowCenter>
                            <VscAccount /> <To href="/settings">Account</To>
                          </RowCenter>

                          <RowCenter>
                            <Button
                              type="button"
                              onClick={handleLogOut}
                              width="100%"
                              padding="8px"
                              margin="0px"
                            >
                              Log out
                            </Button>
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
                <Link href="/">
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
