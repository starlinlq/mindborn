import { useSelector } from "react-redux";

import { RootState } from "../../store/store";
import { Redirect, Route } from "react-router-dom";

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
        user.isAuth ? (
          children
        ) : (
          <Redirect to={{ pathname: "/", state: { from: location } }} />
        )
      }
    />
  );
}
