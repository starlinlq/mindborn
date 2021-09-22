import { Dispatch, useEffect } from "react";
import NavBar from "./components/navBar/NavBar";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "./styles/theme";
import Spinner, { Container, GlobalStyles } from "./styles/global";
import { Router, Switch, Route } from "react-router-dom";
import Register from "./components/forms/Register";
import Login from "./components/forms/Login";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createBrowserHistory } from "history";
import { validateUser } from "./store/user/actionCreators";
import { RootState } from "./store/store";
import Home from "./layout/Home";
import { Submit } from "./layout/Submit";
import Post from "./layout/Post";
import Profile from "./layout/Profile";
import Bookmark from "./layout/bookmark";
import Settings from "./layout/Settings";
import SearchPage from "./layout/SearchPage";
import Chat from "./layout/Chat";
import * as actionTypes from "./store/user/actionType";
import socket from "./socket/socket";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import agent from "./api/agent";

export const history = createBrowserHistory();

function App() {
  const dispatch: Dispatch<any> = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (user.isAuth) {
      socket.emit("sendUser", {
        id: user.id,
        photourl: user.photourl,
        username: user.username,
      });
    }
  }, [user.isAuth]);

  useEffect(() => {
    let token = localStorage.getItem("Authorization");
    if (token) {
      dispatch(validateUser(token));
    } else {
      dispatch({ type: actionTypes.SET_STATE_LOADING, payload: false });
    }
  }, []);

  return (
    <Router history={history}>
      <ThemeProvider theme={lightTheme}>
        <GlobalStyles />
        <NavBar />
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Container>
          {user.stateLoading ? (
            <Spinner />
          ) : (
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />

              <PrivateRoute exact path="/bookmark">
                <Bookmark />
              </PrivateRoute>
              <PrivateRoute exact path="/profile/:id">
                <Profile />
              </PrivateRoute>
              <PrivateRoute exact path="/">
                <Home />
              </PrivateRoute>
              <PrivateRoute exact path="/submit">
                <Submit />
              </PrivateRoute>
              <PrivateRoute exact path="/post/:id">
                <Post />
              </PrivateRoute>
              <PrivateRoute exact path="/settings">
                <Settings />
              </PrivateRoute>
              <PrivateRoute exact path="/search">
                <SearchPage />
              </PrivateRoute>
              <PrivateRoute exact path="/messages">
                <Chat />
              </PrivateRoute>
            </Switch>
          )}
        </Container>
      </ThemeProvider>
    </Router>
  );
}

export default App;
