const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
  res.send("Hello");
});

io.on('connection', (socket) => {
  const username = socket.handshake.query.username
  socket.emit('joined', username)
    console.log(`User ${username} connected`);
  socket.on('message', (data)=>{
    console.log(data)
    io.emit('message', data)
  })
});

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});