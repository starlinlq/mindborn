import React, { Dispatch, useEffect } from "react";
import NavBar from "./components/navBar/NavBar";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./styles/theme";
import { Container, GlobalStyles } from "./styles/global";
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

export const history = createBrowserHistory();

function App() {
  const dispatch: Dispatch<any> = useDispatch();
  const data = useSelector((state: RootState) => state);
  console.log(data.user);

  useEffect(() => {
    let token = localStorage.getItem("Authorization");
    if (token) {
      dispatch(validateUser(token));
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
          <Switch>
            <Route exact path="/submit" component={Submit} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/" component={Home} />
            <Route exact path="/post/:id" component={Post} />
          </Switch>
        </Container>
      </ThemeProvider>
    </Router>
  );
}

export default App;
