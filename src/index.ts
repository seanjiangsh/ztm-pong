import http from "http";
import socketIO from "socket.io";

import app from "./app";
import * as sockets from "./sockets";

const PORT = 5000;
const httpServer = http.createServer(app);
const socketServer = new socketIO.Server(httpServer);

sockets.listen(socketServer);
httpServer.listen(PORT);
console.log(`Listening on port ${PORT}...`);
