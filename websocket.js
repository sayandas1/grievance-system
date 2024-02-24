const socketio = require('socket.io');

let io;

const init = (server) => {
  io = socketio(server);

  io.on('connection', (socket) => {
    socket.on('join', (grievanceId) => {
      socket.join(grievanceId);
    });

    socket.on('message', (data) => {
      io.to(data.grievanceId).emit('newMessage', {
        sender: socket.id,
        message: data.message,
        createdAt: new Date()
      });
    });
  });
};

const getIO = () => {
  if (!io) {
    throw new Error('Socket.io not initialized');
  }
  return io;
};

module.exports = { init, getIO };
