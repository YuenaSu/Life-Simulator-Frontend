import { useNavigate } from "react-router-dom";

import gameService from "../../../services/gameService";
import ActionButton from "../../button/ActionButton";

import "./index.css";

export default function GameOverModal({ setShowModal, setRefresh, refresh }) {
  const nav = useNavigate();

  return (
    <div>
      <div className="game-over">Game Over</div>
      <ActionButton
        onClick={() => {
          gameService.newGame().then(() => {
            nav("/game");
            setShowModal(false);
            setRefresh(!refresh);
          });
        }}
        title="Start a new life"
      />
      <ActionButton
        onClick={() => {
          gameService.deleteGame().then(() => {
            nav("/");
          });
        }}
        title="Back to main page"
      />
    </div>
  );
}
