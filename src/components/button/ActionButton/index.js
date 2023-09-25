import "./index.css";

export default function ActionButton({ title, onClick, type = "primary" }) {
  const className = `action-button-${type}`;
  return (
    <button
      className={className}
      onClick={(event) => {
        event.stopPropagation();
        onClick();
      }}
    >
      {title}
    </button>
  );
}
