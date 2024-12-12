import { ReactNode, useEffect } from "react";
import { socket, SocketContext } from "./socket";
import { useToast } from "@/components/ui/use-toast";

interface SocketProviderProps {
  children: ReactNode;
}

export function SocketProvider({ children }: SocketProviderProps) {
  const { toast } = useToast();

  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      console.log("Connected to WebSocket");
    });

    socket.on("connect_error", () => {
      toast({
        variant: "destructive",
        title: "Connection Error",
        description: "Failed to connect to the server. Retrying...",
      });
    });

    return () => {
      socket.disconnect();
    };
  }, [toast]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
