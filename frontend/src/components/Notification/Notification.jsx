import React from "react";
import "./NotificationPanel.css"; 

const NotificationPanel = ({ notifications, onClose }) => {
  return (
    <div className="notification-panel">
      <div className="notification-header">
        <h3>Notifications</h3>
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
      </div>
      <div className="notification-list">
      {notifications.length === 0 ? (
          <p>No notifications yet.</p>
        ) : (
          notifications.map((notification, index) => (
            <div key={index} className="notification-item">
              {notification.message}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationPanel;
