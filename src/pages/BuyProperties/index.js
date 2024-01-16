import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import gameService from "../../services/gameService";
// import { formatDollar } from "../../utils/stringUtils";

import MainContainer from "../../components/container/MainContainer";
// import MainButton from "../../components/button/MainButton";
// import Loading from "../../components/general/Loading";
import AssetCard from "../../components/card/AssetCard";

import "./index.css";

export default function BuyProperties() {
  // const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState(undefined);
  // const [properties, setProperties] = useState([]);

  useEffect(() => {
    gameService
      .getProperties()
      .then((res) => {
        console.log(res);
      })
      .catch(() => {
        setError("something went wrong");
      });
  }, []);

  return (
    <MainContainer>
      {error ? <div>{error}</div> : null}
      <div className="buy-properties-container">
        <h1>Market</h1>
        <AssetCard
          asset={location.state.stats.asset}
          cash={location.state.stats.cash}
          salary={location.state.details.job.salary}
        />
        <div>{gameService.getProperties}</div>
      </div>
    </MainContainer>
  );
}
