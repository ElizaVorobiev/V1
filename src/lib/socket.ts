import { io, Socket } from "socket.io-client";
import { createContext, useContext } from "react";

// For development, connect to localhost
const SOCKET_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:3001"
    : "wss://api.example.com";

export const socket = io(SOCKET_URL, {
  autoConnect: true,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  transports: ["websocket", "polling"],
});

export const SocketContext = createContext<Socket>(socket);

export const useSocket = () => useContext(SocketContext);
