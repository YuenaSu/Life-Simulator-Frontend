import { Link } from "react-router-dom";

import "./index.css";

export default function MainButton({
  onClick,
  title,
  as,
  to,
  disabled = false,
  minWidth = "100%",
}) {
  return (
    <div className="main-button-container">
      {as === "Link" ? (
        <Link to={to}>
          <button
            style={{
              minWidth,
            }}
            className="main-button"
            disabled={disabled}
            onClick={onClick}
          >
            {title}
          </button>
        </Link>
      ) : (
        <button
          style={{
            minWidth,
          }}
          className="main-button"
          disabled={disabled}
          onClick={onClick}
        >
          {title}
        </button>
      )}
    </div>
  );
}
