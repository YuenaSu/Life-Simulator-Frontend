import { useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { register } from "../../store/slices/userSlice";
import "./index.css";
import { validateEmail } from "../../utils/stringUtils";
import Header from "../../components/general/Header";

export default function Register() {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const submit = (event) => {
    event.preventDefault();
    if (!validateEmail(email)) {
      setError("Invalid email");
      return;
    }
    dispatch(register({ email, password, username })).then((res) => {
      if (res.error) {
        setError("register failed");
      } else {
        nav("/", { replace: true });
      }
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
                Register
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
                <div className="form-label mt-2 pb-2">
                  <input
                    type="password"
                    value={password}
                    className="form-control autocomplete"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <div className="form-label mt-2">
                  <input
                    type="text"
                    value={username}
                    className="form-control autocomplete"
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>
              <div className="text-danger">{error}</div>
              <button type="submit" className="btn btn-primary mt-3">
                Start A New Life
              </button>
              <div className="login">
                already have an account? <a href="/login">login</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
