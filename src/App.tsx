import React, { Dispatch, useEffect, useRef } from "react";
import NavBar from "./components/navBar/NavBar";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./styles/theme";
import { Container, GlobalStyles } from "./styles/global";
import { Router, Switch, Route } from "react-router-dom";
import Register from "./components/forms/Register";
import Login from "./components/forms/Login";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
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
import agent from "./api/agent";
import socket from "./socket/socket";
import PrivateRoute from "./components/privateRoute/PrivateRoute";

export const history = createBrowserHistory();

function App() {
  const dispatch: Dispatch<any> = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    let token = localStorage.getItem("Authorization");

    if (token) {
      dispatch(validateUser(token));
    }
    if (user.isAuth) {
      let get = async () => {
        try {
          let data = await agent.user.getNotifications();
          console.log(data);

          dispatch({
            type: actionTypes.GET_NOTIFICATIONS,
            payload: { notifications: data },
          });
        } catch (error: any) {
          toast.error(error.message);
        }
      };
      get();
    }
  }, [user.isAuth, dispatch]);

  useEffect(() => {
    if (user.isAuth) {
      socket.emit("sendUser", {
        id: user.id,
        photourl: user.photourl,
        username: user.username,
      });
    }
  }, [user]);

  useEffect(() => {
    if (user.isAuth) {
      socket.on("getNotification", (notification) => {
        dispatch({ type: actionTypes.ADD_NOTIFICATION, payload: notification });
        console.log("hey there");
      });
    }
  }, [user.isAuth, dispatch]);

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
          <Switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/" component={Login} />
            <PrivateRoute exact path="/bookmark">
              <Bookmark />
            </PrivateRoute>
            <PrivateRoute exact path="/profile/:id">
              <Profile />
            </PrivateRoute>
            <PrivateRoute exact path="/home">
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
            <PrivateRoute exact path="messages">
              <Chat />
            </PrivateRoute>
          </Switch>
        </Container>
      </ThemeProvider>
    </Router>
  );
}

export default App;
