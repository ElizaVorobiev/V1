import { io, Socket } from "socket.io-client";
import { createContext, useContext } from "react";

// In a real app, this would be an environment variable
const SOCKET_URL = "wss://api.example.com";

export const socket = io(SOCKET_URL, {
  autoConnect: false,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

export const SocketContext = createContext<Socket>(socket);

export const useSocket = () => useContext(SocketContext);
