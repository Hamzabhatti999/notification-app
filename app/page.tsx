// app/page.tsx

"use client";
import { useEffect, useState } from "react";

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
    <div className="flex flex-col justify-center items-center h-screen px-10 space-y-4">
      <h1 className="text-2xl font-bold">Push Notification App</h1>
      <input
        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        size={20}
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter your notification message"
      />
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={sendNotification}
      >
        Send Notification
      </button>
    </div>
  );
};

export default Home;
