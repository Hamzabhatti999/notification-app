// app/page.tsx

"use client";
import { useEffect, useState } from "react";
import { pusherClient } from "@/lib/pusher";
const Home = () => {
  const [notifications, setNotifications] = useState<any[]>([]);
  pusherClient.connection.bind("connected", () => {
    console.log("----------->pusher client connected===========");
  });
  pusherClient.subscribe("notifications").bind("push-data", (data: any) => {
    setNotifications([...notifications, data]);
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
