// app/page.tsx

"use client";
import { useEffect, useState } from "react";
import socket from "../lib";

const Home = () => {
  const [notifications, setNotifications] = useState<string[]>([]);
  const [message, setMessage] = useState<string>("");
  const sendNotification = async () => {
    if (message.trim()) {
      await fetch("/api/notify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });
      setMessage("");
    }
  };

  return (
    <div>
      <h1>Push Notification App</h1>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter your notification message"
      />
      <button onClick={sendNotification}>Send Notification</button>
      <h2>Notifications:</h2>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index}>{notification}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
