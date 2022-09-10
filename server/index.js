const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8082 });

wss.on("connection", (ws) => {
  console.log("Client connected" + "Total clients: " + wss.clients.size);

  ws.on("message", (data) => {
    console.log(JSON.parse(data));
    wss.broadcast(data);
  });

  ws.on("close", () => {
    console.log("Client disconnected" + "Total clients: " + wss.clients.size);
  });
});

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};
console.log("Server started on port 8082");
