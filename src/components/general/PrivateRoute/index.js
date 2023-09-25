import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { selectAuth, selectUser } from "../../../store/slices/userSlice";

import Login from "../../../pages/Login";
import Admin from "../../../pages/Admin";
import GameLanding from "../../../pages/GameLanding";
import permissions from "../../../utils/permissions";

export default function PrivateRoute({ children }) {
  const auth = useSelector(selectAuth);
  const user = useSelector(selectUser);
  const loc = useLocation();

  if (auth) {
    if (user?.permissions?.includes(permissions.canManageUsers)) {
      return <Admin />;
    }

    if (loc.pathname.includes("admin")) {
      return <GameLanding />;
    }

    return children;
  }
  return <Login />;
}
