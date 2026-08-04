import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { websocketService } from "@/services/api/websocketService";

interface WebSocketContextType {
  isConnected: boolean;
  subscribe: (eventType: string, callback: (data: any) => void) => void;
  unsubscribe: (eventType: string, callback: (data: any) => void) => void;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (isAuthenticated && token) {
      websocketService.connect(token);
      setIsConnected(true);

      const statusInterval = setInterval(() => {
        setIsConnected(websocketService.getStatus().isConnected);
      }, 3000);

      return () => {
        clearInterval(statusInterval);
        websocketService.disconnect();
        setIsConnected(false);
      };
    } else {
      websocketService.disconnect();
      setIsConnected(false);
    }
  }, [isAuthenticated]);

  return (
    <WebSocketContext.Provider
      value={{
        isConnected,
        subscribe: (eventType, callback) => websocketService.subscribe(eventType, callback),
        unsubscribe: (eventType, callback) => websocketService.unsubscribe(eventType, callback),
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error("useWebSocket must be used within a WebSocketProvider");
  }
  return context;
};
