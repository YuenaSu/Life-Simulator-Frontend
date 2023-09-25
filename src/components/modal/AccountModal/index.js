import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { selectUser, logout } from "../../../store/slices/userSlice";
import userServices from "../../../services/userServices";

import "./index.css";

export default function AccountModal({ setShowModal }) {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const nav = useNavigate();

  return (
    <div className="account-modal">
      <div>
        <i
          className="bi bi-x-circle-fill ms-auto account-modal-close"
          onClick={() => {
            setShowModal(false);
          }}
        />
      </div>
      <div className="account-modal-username">{user.username}</div>
      <div className="account-modal-email">{user.email}</div>
      <button
        className="account-modal-logout"
        onClick={() => {
          userServices.logout();
          dispatch(logout());
          nav("/login");
        }}
      >
        Logout
      </button>
    </div>
  );
}
