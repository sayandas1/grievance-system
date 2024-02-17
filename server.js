const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const socketio = require('socket.io');
const bodyParser = require('body-parser');
const { init: initWebSocket } = require('./websocket');
const authRoutes = require('./routes/auth');
const grievancesRoutes = require('./routes/grievances');
const chatRoutes = require('./routes/chat');
const { mongoURI, jwtSecret } = require('./config');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/auth', authRoutes);
app.use('/grievances', grievancesRoutes);
app.use('/chat', chatRoutes);

// MongoDB connection
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    // Start WebSocket server
    initWebSocket(io);
    // Start the server
    server.listen(3000, () => {
      console.log('Server running on port 3000');
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
  });