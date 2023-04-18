import http from "http";
import express from "express";
import socketIO from "socket.io";
import cors from "cors";

const PORT = 5000;
const app = express();
const server = http.createServer(app);

const corsOpt = { cors: { origin: "*", methods: ["GET", "POST"] } };
const io = new socketIO.Server(server, corsOpt);
io.on("connection", (client) => {
  console.log("client connected");
});

server.listen(PORT);
console.log(`Listening on port ${PORT}...`);
