// app/page.tsx

"use client";
import { useEffect, useState } from "react";
import socket from "@/lib";

const Home = () => {
  const [notifications, setNotifications] = useState<string[]>([]);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    socket.on("receiveNotification", (notification: string) => {
      setNotifications((prev) => [...prev, notification]);
    });

    return () => {
      socket.off("receiveNotification");
    };
  }, []);

  const sendNotification = () => {
    if (message.trim()) {
      socket.emit("sendNotification", message);
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
