import { NextApiRequest, NextApiResponse } from "next";
import { Server as HTTPServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import { Server as NetServer } from "net";
export type NextApiResponseWithSocket = NextApiResponse & {
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
  console.log("Socket is initializing");
  if (!res.socket.server.io) {
    const io = new SocketIOServer(res.socket.server, {
      path: "/api/socket",
    });
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      console.log("-- Socket client connected --");

      socket.on("disconnect", () => {
        console.log("Client disconnected");
      });
      socket.on("sendNotification", (message, ack) => {
        console.log(ack, "---------message ---", message);
      });
    });
  } else {
    console.log("Socket is already running");
  }
  res.end();
}
