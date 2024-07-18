// lib.ts
import { io, Socket } from "socket.io-client";

const socket: Socket = io({
  path: "/api/socket",
});

export default socket;
