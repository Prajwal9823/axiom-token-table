const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 8081 });
console.log("✅ Mock WebSocket running on ws://localhost:8081");

const tokens = [
  { id: "BTC-USDC", price: 36000 },
  { id: "ETH-USDC", price: 2000 },
  { id: "AXM-ETH", price: 0.023 },
];

setInterval(() => {
  tokens.forEach(t => {
    const delta = (Math.random() - 0.5) * t.price * 0.01;
    t.price = Math.max(0.0001, t.price + delta);
  });
  const payload = tokens.map(t => ({ ...t }));
  wss.clients.forEach(ws => ws.send(JSON.stringify({ type: "PRICE_UPDATE", data: payload })));
}, 1000);
