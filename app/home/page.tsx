// app/page.tsx

"use client";
import { useEffect, useState } from "react";
import socket from "@/lib";
import { io } from "socket.io-client";
const Home = () => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [message, setMessage] = useState<string>("");
  socket.on("sendNotification", (message, ack) => {
    console.log(
      " ..................sendNotification....................",
      message
    );
    ack({ msg: "received", message: message });
    setNotifications([...notifications, message]);
  });

  return (
    <div>
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
