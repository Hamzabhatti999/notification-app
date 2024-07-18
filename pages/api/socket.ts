// pages/api/socket.ts
import { Server as HTTPServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import { NextApiRequest, NextApiResponse } from "next";
import { Server as NetServer } from "net";

type NextApiResponseWithSocket = NextApiResponse & {
  socket: NetServer & {
    server: HTTPServer & {
      io: SocketIOServer;
    };
  };
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponseWithSocket
) {
  if (!res.socket.server.io) {
    console.log("Socket is initializing");
    const io = new SocketIOServer(res.socket.server, {
      path: "/api/socket",
    });
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      console.log("New client connected");

      socket.on("disconnect", () => {
        console.log("Client disconnected");
      });

      socket.on("sendNotification", (message) => {
        io.emit("receiveNotification", message);
      });
    });
  } else {
    console.log("Socket is already running");
  }
  res.end();
}
