const socketIO = require('socket.io');

const setupSocket = (server) => {
  const io = socketIO(server, {
    cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log('A user connected');

    // Listen for new posts
    socket.on('newPost', (post) => {
      io.emit('newPost', post);
    });

    // Listen for new comments
    socket.on('newComment', (comment) => {
      io.emit('newComment', comment);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });

  return io;
};

module.exports = setupSocket;