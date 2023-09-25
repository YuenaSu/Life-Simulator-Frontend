import { formatDollar } from "../../../utils/stringUtils";

import "./index.css";

export default function AssetCard({ cash, asset, salary }) {
  return (
    <div className="asset-card-container">
      <div className="asset-card-item">
        <div className="asset-card-item-title">Cash: </div>
        <div className="asset-card-item-value">{formatDollar(cash)}</div>
      </div>
      <div className="asset-card-item">
        <div className="asset-card-item-title">Asset: </div>
        <div className="asset-card-item-value">{formatDollar(asset)}</div>
      </div>
      <div className="asset-card-item">
        <div className="asset-card-item-title">Salary: </div>
        <div className="asset-card-item-value">{formatDollar(salary)}</div>
      </div>
    </div>
  );
}
