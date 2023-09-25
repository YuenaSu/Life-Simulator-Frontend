import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";

import "./index.css";

import AccountModal from "../../modal/AccountModal";

export default function Header({ hideAccount }) {
  const [showModal, setShowModal] = useState(false);
  const nav = useNavigate();

  return (
    <div className="d-flex header-container">
      <div
        className="logo"
        onClick={() => {
          nav("/");
        }}
      >
        <h1>Billionaire</h1>
      </div>
      {hideAccount ? null : (
        <i
          className="bi bi-person-circle account-heading ms-auto"
          onClick={() => {
            setShowModal(!showModal);
          }}
        />
      )}

      <Modal
        className="account-modal-container"
        isOpen={showModal}
        contentLabel="Account"
        appElement={document.getElementById("root") || undefined}
      >
        <AccountModal setShowModal={setShowModal} />
      </Modal>
    </div>
  );
}
