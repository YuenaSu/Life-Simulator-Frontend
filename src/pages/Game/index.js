import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";

import gameService from "../../services/gameService";
import { formatDollar } from "../../utils/stringUtils";

import MainContainer from "../../components/container/MainContainer";
import MainButton from "../../components/button/MainButton";
import Loading from "../../components/general/Loading";
import GameOverModal from "../../components/modal/GameOverModal";
import AssetCard from "../../components/card/AssetCard";

import "./index.css";

export default function Game() {
  const navigate = useNavigate();
  const [game, setGame] = useState(undefined);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(undefined);
  const [refresh, setRefresh] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [msg, setMsg] = useState("");
  const [delay, setDelay] = useState(10);
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [properties, setProperties] = useState([]);
  const [showProperties, setShowProperties] = useState(false);
  const [url, setUrl] = useState("http://localhost:3000/study.png");

  useEffect(() => {
    const commonUrl = "http://localhost:3000/";

    setUrl(() => {
      // console.log(game.details);
      if (game === undefined) {
        return "http://localhost:3000/study.png";
      }
      if (game.details.job.level <= 1) {
        return `${commonUrl}1-2${game.details.jobCategory}.jpg`;
      }
      if (game.details.job.level > 1 && game.details.job.level <= 4) {
        return `${commonUrl}3-5${game.details.jobCategory}.jpg`;
      }
      if (game.details.job.level > 4 && game.details.job.level <= 7) {
        return `${commonUrl}6-8${game.details.jobCategory}.jpg`;
      }
      return "http://localhost:3000/study.png";
    });
  }, [game]);

  useEffect(() => {
    let timeout;

    if (currentIndex < msg.length) {
      timeout = setTimeout(() => {
        setCurrentText((prevText) => prevText + msg[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, delay);
    }

    return () => clearTimeout(timeout);
  }, [currentIndex, msg, delay]);

  useEffect(() => {
    if (currentIndex === msg.length) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [currentIndex, msg]);

  useEffect(() => {
    setCurrentIndex(0);
    setCurrentText("");
    setShowProperties(false);
    gameService
      .getGame()
      .then((res) => {
        setGame(res.data);
        setMsg(res.data.message);
      })
      .catch(() => {
        setError("something went wrong");
      });
  }, [refresh]);

  useEffect(() => {
    if (game?.isOver) {
      setShowModal(true);
    }
  }, [game]);

  return (
    // <div className="game-bg">
    <MainContainer isGamePage>
      {error ? <div>{error}</div> : null}
      {game ? (
        <div>
          <div>
            <h4 id="old">
              You are <h2 id="old">{game.stats.age}</h2> Years old now
            </h4>
          </div>

          <div
            className="game-image-container"
            style={{
              backgroundImage: `url(${url})`,
            }}
          >
            <div className="game-image-overlay" />
            <div className="game-title-container">
              <h5 className="job-title">{game.details.job.title}</h5>
            </div>
            <div
              className="game-message-container"
              onClick={() => {
                setDelay(1);
              }}
            >
              <div>{currentText}</div>
            </div>
          </div>

          <div className="game-bot-button-container">
            <div className="game-bot-button">
              <AssetCard
                asset={game.stats.asset}
                cash={game.stats.cash}
                salary={game.details.job.salary}
              />
              {showProperties ? (
                <div className="game-property-container">
                  {properties.length === 0 ? (
                    <div>No properties</div>
                  ) : (
                    <div>
                      {properties.map((property) => (
                        <div className="game-property" key={property.name}>
                          <div className="game-property-name">
                            {property.name}
                          </div>
                          <div>
                            Bought value: {formatDollar(property.value)}
                          </div>
                          <div>
                            Current value: {formatDollar(property.currentValue)}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : null}
              <div className="game-action-button-container">
                <div className="game-action-button">
                  <MainButton
                    onClick={() => {
                      // setProperties(game.details.houses);
                      // setShowProperties(true);
                      navigate("/game/buy-properties", {
                        state: game,
                      });
                    }}
                    title="Houses"
                  />
                  <MainButton
                    onClick={() => {
                      setProperties(game.details.cars);
                      setShowProperties(true);
                    }}
                    title="Cars"
                  />
                </div>
                <div className="game-action-button">
                  <MainButton
                    onClick={() => {
                      gameService.deleteGame().then(() => {
                        navigate("/");
                      });
                    }}
                    title="Retire Earlier"
                  />
                  <MainButton
                    onClick={() => {
                      setDisabled(true);
                      setShowProperties(false);
                      setDelay(10);
                      gameService
                        .nextYear()
                        .then((res) => {
                          setCurrentIndex(0);
                          setCurrentText("");
                          setDisabled(false);
                          setGame(res.data?.game);
                          setMsg(res.data?.game.message);
                        })
                        .catch(() => {
                          setDisabled(false);
                        });
                    }}
                    disabled={disabled}
                    title="Next Year"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
      <Modal
        className="account-modal-container"
        isOpen={showModal}
        contentLabel="Account"
        appElement={document.getElementById("root") || undefined}
      >
        <GameOverModal
          setShowModal={setShowModal}
          setRefresh={setRefresh}
          refresh={refresh}
        />
      </Modal>
    </MainContainer>
    // </div>
  );
}
