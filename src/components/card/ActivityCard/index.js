import "./index.css";

export default function ActivityCard({ title, value }) {
  return (
    <div className="activity-card">
      <div className="activity-card-title">{title}</div>
      <div className="activity-card-value">{value}</div>
    </div>
  );
}
