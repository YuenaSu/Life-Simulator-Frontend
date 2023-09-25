import "./index.css";

import Header from "../../general/Header";

export default function MainContainer({ children, ...props }) {
  return (
    <div
      className="main-container"
      style={{
        justifyContent: props["justify-content"] || "flex-start",
      }}
    >
      <Header />
      {children}
    </div>
  );
}
