// socketio.js

const socketIo = require('socket.io');

const initSocketIO = (server) => {
  const io = socketIo(server, {
    cors: {
      origin: "*",
    },
  });
  const connectedemployees = {};

  io.on('connection', (socket) => {
    console.log(`${socket.id} user connected`);

    socket.on('join', (userId) => {
      connectedemployees[userId] = socket.id;
      console.log(`User ${userId} joined`);
    });

    socket.on('private-message', ({ employeeId, name }) => {
      const targetSocketId = connectedemployees[employeeId];
      if (targetSocketId) {
        console.log(targetSocketId);
        io.to(targetSocketId).emit('notification', name);
      }
    });

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });

  return io;
};

module.exports = initSocketIO;
