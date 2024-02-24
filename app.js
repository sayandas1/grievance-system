const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const grievanceRoutes = require('./routes/grievanceRoutes');
const chatRoutes = require('./routes/chatRoutes');

dotenv.config();
const app = express();

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/auth', authRoutes);
app.use('/grievances', grievanceRoutes);
app.use('/chat', chatRoutes);

// Database connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

// Server setup
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// WebSocket setup
const io = require('socket.io')(server);
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('join', (grievanceId) => {
    socket.join(grievanceId);
  });

  socket.on('message', (data) => {
    io.to(data.grievanceId).emit('newMessage', {
      sender: 'You',
      message: data.message,
      createdAt: new Date().toISOString(),
    });
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

module.exports = app;