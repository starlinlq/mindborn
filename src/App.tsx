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

import Home from "./components/home/Home";
import Create from "./components/create/Create";

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
            <Route exact path="/create" component={Create} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/" component={Home} />
          </Switch>
        </Container>
      </ThemeProvider>
    </Router>
  );
}

export default App;
