import { NextApiRequest, NextApiResponse } from "next";
import { Server as HTTPServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import { Server as NetServer } from "net";
import { NextApiResponseWithSocket } from "./socket";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseWithSocket
) {
  console.log("Socket is initializing");
  if (req.method === "POST") {
    const { message } = req.body;
    console.log("body ", req.body);
    let io = res.socket.server.io;
    const notification = io.emit("sendNotification", message);
    console.log("------- socket------", notification);
    res.status(200).send("successfull");
  }
}
