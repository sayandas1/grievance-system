const socketio = require('socket.io');
const Message = require('./models/Message');

let io;

const init = (server) => {
  io = socketio(server);

  io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('join', (grievanceId) => {
      socket.join(grievanceId);
    });

    socket.on('message', async (data) => {
      const { grievanceId, message } = data;
      const newMessage = new Message({ grievance: grievanceId, sender: socket.id, message });
      await newMessage.save();
      io.to(grievanceId).emit('newMessage', newMessage);
    });

    socket.on('disconnect', () => {
      console.log('A user disconnected');
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
