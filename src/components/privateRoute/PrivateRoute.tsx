import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router";
import { RootState } from "../../store/store";

type Props = {
  children: React.ReactNode;
  path: string;
  exact?: boolean;
};

export default function PrivateRoute({ children, path, exact }: Props) {
  const user = useSelector((state: RootState) => state.user);

  return (
    <Route
      exact
      path={path}
      render={({ location }) =>
        user.isAuth ? children : <Redirect to="/login" />
      }
    />
  );
}
