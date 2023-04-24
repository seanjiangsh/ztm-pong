import socketIO from "socket.io";

let readyPlayerCount = 0;

export function listen(io: socketIO.Server) {
  const pongNS = io.of("/pong");
  pongNS.on("connection", (sock) => {
    console.log(`client connected, ID: ${sock.id}`);
    let room: string;

    // * build-in events
    sock.on("disconnect", (reason) => {
      console.log(`client disconnected, ID: ${sock.id}, reason: ${reason}`);
      // readyPlayerCount--;
      sock.leave(room);
    });

    // * self-def events
    sock.on("ready", () => {
      room = `room${Math.floor(readyPlayerCount / 2)}`;
      sock.join(room);
      readyPlayerCount++;
      console.log(`Player ready, ID:${sock.id}`);
      console.log(`readyPlayerCount: ${readyPlayerCount}`);
      if (readyPlayerCount % 2 === 0) {
        console.log("startGame", sock.id);
        pongNS.in(room).emit("startGame", sock.id);
      }
    });
    sock.on("paddleMove", (paddleData) => {
      sock.to(room).emit("paddleMove", paddleData);
    });
    sock.on("ballMove", (ballData) => {
      sock.to(room).emit("ballMove", ballData);
    });
  });
}
