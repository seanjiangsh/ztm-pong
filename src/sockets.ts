import socketIO from "socket.io";

let readyPlayerCount = 0;

export function listen(io: socketIO.Server) {
  const pongNS = io.of("/pong");
  pongNS.on("connection", (sock) => {
    console.log(`client connected, ID: ${sock.id}`);

    // * build-in events
    sock.on("disconnect", (reason) => {
      console.log(`client disconnected, ID: ${sock.id}, reason: ${reason}`);
      readyPlayerCount--;
    });

    // * self-def events
    sock.on("ready", () => {
      readyPlayerCount++;
      console.log(`Player ready, ID:${sock.id}`);
      console.log(`readyPlayerCount: ${readyPlayerCount}`);
      if (readyPlayerCount % 2 === 0) {
        console.log("startGame", sock.id);
        pongNS.emit("startGame", sock.id);
      }
    });
    sock.on("paddleMove", (paddleData) => {
      sock.broadcast.emit("paddleMove", paddleData);
    });
    sock.on("ballMove", (ballData) => {
      sock.broadcast.emit("ballMove", ballData);
    });
  });
}
