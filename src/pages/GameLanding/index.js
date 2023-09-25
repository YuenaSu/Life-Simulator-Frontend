import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import gameService from "../../services/gameService";

import MainButton from "../../components/button/MainButton";
import MainContainer from "../../components/container/MainContainer";

import "./index.css";

export default function GameLanding() {
  const [haveUnfinishedGame, setHaveUnfinishedGame] = useState(false);
  const nav = useNavigate();

  const retireveGame = useCallback(() => {
    gameService
      .getGame()
      .then((res) => {
        if (res.data) {
          setHaveUnfinishedGame(true);
        }
      })
      .catch(() => {
        setHaveUnfinishedGame(false);
      });
  }, []);

  useEffect(() => {
    retireveGame();
  }, [retireveGame]);

  return (
    <MainContainer>
      <div className="game-landing-button-container">
        <div className="game-landing-money-gif" />
        <div className="game-landing-continue-button">
          {haveUnfinishedGame ? (
            <MainButton
              title="Continue last game"
              onClick={() => {
                nav("/game");
              }}
            />
          ) : null}
          <MainButton
            title="Start a new game"
            onClick={() => {
              gameService.newGame().then(() => {
                nav("/game");
              });
            }}
          />
        </div>
        <div className="game-landing-money-gif" />
      </div>
    </MainContainer>
  );
}
