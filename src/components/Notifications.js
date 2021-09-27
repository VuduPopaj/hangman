import React from "react";

const Notifications = ({ showNotification }) => {
  return (
    <div className={`notification-container ${showNotification ? "show" : ""}`}>
      <p>Oops! We have that letter already!</p>
    </div>
  );
};

export default Notifications;
