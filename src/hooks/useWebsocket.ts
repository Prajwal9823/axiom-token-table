"use client";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { updatePrices } from "@/store/tokensSlice";

export function useWebsocket(url = (process.env.NEXT_PUBLIC_WS_URL ?? "ws://localhost:8081")) {
  const dispatch = useDispatch();
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    let mounted = true;
    let reconnectTimeout: any = null;

    function connect() {
      try {
        const ws = new WebSocket(url);
        wsRef.current = ws;

        ws.addEventListener("open", () => {
          // console.log("WS open");
        });

        ws.addEventListener("message", (ev) => {
          if (!mounted) return;
          try {
            const msg = JSON.parse(ev.data);
            if (msg.type === "PRICE_UPDATE") {
              dispatch(updatePrices(msg.data));
            } else if (msg.type === "INITIAL") {
              // initial may contain partial data shapes
              dispatch(updatePrices(msg.data));
            }
          } catch (e) {
            // ignore parse errors
            // console.error("WS parse error", e);
          }
        });

        ws.addEventListener("close", () => {
          // try reconnect with backoff
          reconnectTimeout = setTimeout(connect, 1000 + Math.random() * 2000);
        });

        ws.addEventListener("error", () => {
          ws.close();
        });
      } catch (e) {
        reconnectTimeout = setTimeout(connect, 1500);
      }
    }

    connect();
    return () => {
      mounted = false;
      if (reconnectTimeout) clearTimeout(reconnectTimeout);
      wsRef.current?.close();
    };
  }, [dispatch, url]);
}
