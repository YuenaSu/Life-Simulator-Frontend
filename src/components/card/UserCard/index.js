import ActionButton from "../../button/ActionButton";

import "./index.css";

export default function UserCard({
  username,
  email,
  role,
  deleteAction,
  onClick,
  expanded,
}) {
  return (
    <div className="admin-user-card" onClick={onClick}>
      {expanded ? (
        <div className="admin-user-card-info">
          <div>
            <span className="admin-user-card-field">Username:</span> {username}
          </div>
          <div>
            <span className="admin-user-card-field">Email:</span> {email}
          </div>
          <div>
            <span className="admin-user-card-field">Role:</span>
            {role}
          </div>
        </div>
      ) : (
        <div className="admin-user-card-info">
          <div>
            <span className="admin-user-card-field">Username:</span> {username}
          </div>
        </div>
      )}
      {expanded ? (
        <ActionButton title="Delete" onClick={deleteAction} type="warning" />
      ) : null}
    </div>
  );
}
