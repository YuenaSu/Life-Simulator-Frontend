import { useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import jwtDecode from "jwt-decode";

import { login, loginWithThirdParty } from "../../store/slices/userSlice";
import "./index.css";
import permissions from "../../utils/permissions";

import Header from "../../components/general/Header";

export default function Login() {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = (event) => {
    event.preventDefault();
    dispatch(login({ email, password })).then((res) => {
      if (res.error) {
        setError("login failed");
      } else if (res.payload.permissions.includes(permissions.canManageUsers)) {
        nav("/admin", { replace: true });
      } else {
        nav("/", { replace: true });
      }
    });
  };

  const loginWithGoogle = (res) => {
    const tokenData = jwtDecode(res.credential);
    const loginData = {
      googleId: tokenData.sub,
      ...tokenData,
    };
    const userInfo = {
      email: loginData.email,
      username: loginData.name,
      password: loginData.googleId,
    };
    dispatch(loginWithThirdParty(userInfo)).then(() => {
      nav("/", { replace: true });
    });
  };

  return (
    <div>
      <div className="pt-2 background">
        <div className="login-page-header">
          <Header hideAccount />
        </div>
        <div className="panel">
          <div className="px-5 py-5" id="form-wrap">
            <form onSubmit={submit} autoComplete="off">
              <h2 id="theme-title" className="form-header mb-5 d-inline-block">
                Login
              </h2>
              <div>
                <div className="form-label pb-2">
                  <input
                    type="text"
                    value={email}
                    className="form-control autocomplete"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <div className="form-label mt-2">
                  <input
                    type="password"
                    value={password}
                    className="form-control autocomplete"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="text-danger">{error}</div>
              <button type="submit" className="btn btn-primary mt-3">
                Start A New Life
              </button>
            </form>
            <p className="mt-1">or login with</p>
            <GoogleLogin
              id="login"
              buttonText="Login"
              onSuccess={loginWithGoogle}
              onFailure={() => {}}
              cookiePolicy="single_host_origin"
              style={{ marginTop: "100px" }}
              isSignedIn
              auto_select
            />
            <div className="register">
              don&apos;t have an account? <a href="/register">register</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
