const app = require('./app');
const connectDatabase = require('./config/database');
const { Server } = require('socket.io');

// Handling Uncaught Exception
process.on('uncaughtException', (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

require('dotenv').config({ path: 'config/config.env' });

// Connecting to database
connectDatabase();

const httpServer = app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});

const io = new Server(httpServer);

io.on('connection', (socket) => {
  console.log('A user connected', socket.id);
});

// Unhandled Promise Rejection
process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);

  httpServer.close(() => {
    process.exit(1);
  });
});
