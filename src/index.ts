import http from "http";
import express from "express";
import socketIO from "socket.io";
import cors from "cors";

const PORT = 5000;
const app = express();
const server = http.createServer(app);

let readyPlayerCount = 0;
const corsOpt = { cors: { origin: "*", methods: ["GET", "POST"] } };
const io = new socketIO.Server(server, corsOpt);
io.on("connection", (sock) => {
  console.log(`client connected, ID: ${sock.id}`);
  sock.on("disconnect", (reason) => {
    console.log(`client disconnected, ID: ${sock.id}, reason: ${reason}`);
    readyPlayerCount--;
  });
  // * self-def events
  sock.on("ready", () => {
    readyPlayerCount++;
    console.log(`Player ready, ID:${sock.id}`);
    console.log(`readyPlayerCount: ${readyPlayerCount}`);
    if (readyPlayerCount === 2) {
      io.emit("startGame", sock.id);
    }
  });
  sock.on("paddleMove", (paddleData) => {
    sock.broadcast.emit("paddleMove", paddleData);
  });
});

server.listen(PORT);
console.log(`Listening on port ${PORT}...`);
