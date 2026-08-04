import { API_BASE_URL } from "./axios";

type EventCallback = (data: any) => void;

class WebSocketService {
  private socket: WebSocket | null = null;
  private eventListeners: Map<string, Set<EventCallback>> = new Map();
  private isConnected: boolean = false;
  private reconnectAttempts: number = 0;
  private maxReconnectAttempts: number = 10;
  private pingIntervalId: any = null;
  private token: string | null = null;

  private getWebSocketUrl(token: string): string {
    const httpUrl = API_BASE_URL || "http://localhost:8000";
    const wsUrl = httpUrl.replace(/^http/, "ws");
    return `${wsUrl}/api/ws?token=${encodeURIComponent(token)}`;
  }

  public connect(token: string): void {
    if (this.socket && (this.socket.readyState === WebSocket.OPEN || this.socket.readyState === WebSocket.CONNECTING)) {
      return;
    }

    this.token = token;
    const url = this.getWebSocketUrl(token);

    try {
      this.socket = new WebSocket(url);

      this.socket.onopen = () => {
        console.log("🟢 Real-time WebSocket connection established.");
        this.isConnected = true;
        this.reconnectAttempts = 0;
        this.startHeartbeat();
      };

      this.socket.onmessage = (event: MessageEvent) => {
        try {
          const payload = JSON.parse(event.data);
          if (payload.event === "pong") return;

          console.log("⚡ Real-Time WS Event Received:", payload);
          const eventType = payload.event;
          
          if (eventType && this.eventListeners.has(eventType)) {
            this.eventListeners.get(eventType)?.forEach((cb) => cb(payload.data || payload));
          }

          // Wildcard listener
          if (this.eventListeners.has("*")) {
            this.eventListeners.get("*")?.forEach((cb) => cb(payload));
          }
        } catch (e) {
          console.warn("WS Message parsing error:", e);
        }
      };

      this.socket.onerror = (err) => {
        console.warn("⚠️ WebSocket connection error:", err);
      };

      this.socket.onclose = (event) => {
        console.log(`🔴 WebSocket disconnected (code ${event.code}).`);
        this.isConnected = false;
        this.stopHeartbeat();

        // Reconnect logic with exponential backoff if not closed deliberately
        if (this.token && event.code !== 1008 && this.reconnectAttempts < this.maxReconnectAttempts) {
          this.reconnectAttempts++;
          const timeout = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 15000);
          console.log(`🔄 Reconnecting WebSocket in ${timeout}ms (Attempt ${this.reconnectAttempts})...`);
          setTimeout(() => {
            if (this.token) this.connect(this.token);
          }, timeout);
        }
      };
    } catch (e) {
      console.error("Failed to initialize WebSocket:", e);
    }
  }

  public disconnect(): void {
    this.token = null;
    this.stopHeartbeat();
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
    this.isConnected = false;
  }

  public subscribe(eventType: string, callback: EventCallback): void {
    if (!this.eventListeners.has(eventType)) {
      this.eventListeners.set(eventType, new Set());
    }
    this.eventListeners.get(eventType)?.add(callback);
  }

  public unsubscribe(eventType: string, callback: EventCallback): void {
    if (this.eventListeners.has(eventType)) {
      this.eventListeners.get(eventType)?.delete(callback);
    }
  }

  private startHeartbeat(): void {
    this.stopHeartbeat();
    this.pingIntervalId = setInterval(() => {
      if (this.socket && this.socket.readyState === WebSocket.OPEN) {
        this.socket.send(JSON.stringify({ type: "ping", timestamp: Date.now() }));
      }
    }, 25000);
  }

  private stopHeartbeat(): void {
    if (this.pingIntervalId) {
      clearInterval(this.pingIntervalId);
      this.pingIntervalId = null;
    }
  }

  public getStatus(): { isConnected: boolean } {
    return { isConnected: this.isConnected };
  }
}

export const websocketService = new WebSocketService();
