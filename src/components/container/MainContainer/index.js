import "./index.css";

import Header from "../../general/Header";

export default function MainContainer({ children, isGamePage, ...props }) {
  return (
    <div
      className={isGamePage ? "game-bg" : "main-container"}
      style={{
        justifyContent: props["justify-content"] || "flex-start",
      }}
    >
      <Header />
      {children}
    </div>
  );
}
