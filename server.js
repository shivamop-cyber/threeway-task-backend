const app = require('./app');
const connectDatabase = require('./config/database');
const { Server } = require('socket.io');
const Message = require('./models/messageModel');
const Order = require('./models/orderModel');

process.on('uncaughtException', (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

require('dotenv').config({ path: 'config/config.env' });

connectDatabase();

const httpServer = app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});

const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('chat message', async ({ orderId, senderType, message }) => {
    try {
      const newMessage = new Message({ orderId, senderType, message });
      await newMessage.save();

      const order = await Order.findOne({ orderId });
      order.messages.push(newMessage._id);
      await order.save();

      io.to(orderId).emit('chat message', { orderId, senderType, message });
    } catch (error) {
      console.error('Error saving chat message:', error);
    }
  });

  socket.on('join order', (orderId) => {
    console.log('A user joined order:', orderId);
    socket.join(orderId);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);

  httpServer.close(() => {
    process.exit(1);
  });
});
