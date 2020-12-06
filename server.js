if (process.env.NODE_ENV !== 'production') require('dotenv').config();
const app = require('./server/app');
const port = process.env.PORT || 8000;
const http = require('http').createServer(app);
const Channel = require('./server/db/models/channel');

const io = require('socket.io')(http, {
  cors: {
    origin: true,
    methods: ['GET', 'POST']
  }
});

const changeStream = Channel.watch();

changeStream.on('change', (change) => {
  io.emit('change data', change);
});

io.on('connection', (socket) => {
  console.log('a user is connected', socket.id);

  socket.on('send message', function (msg) {
    // io.emit('receive message', msg);
  });

  socket.on('disconnect', () => {
    console.log('...and disconnected');
  });
});

http.listen(port, () => {
  console.log(`Express is listening on port ${port}`);
});
