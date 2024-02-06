import { Server as HttpServer } from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';

let io: SocketIOServer;

module.exports = {
  init: (httpServer: HttpServer): SocketIOServer => {
    io = new SocketIOServer(httpServer);
    return io;
  },
  getIO: (): SocketIOServer => {
    if (!io) {
      throw new Error('Socket.io not initialized!');
    }
    return io;
  },
};