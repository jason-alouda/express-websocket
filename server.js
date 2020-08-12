const WebSocket = require('ws');
const express = require('express');
const app = express();

const server = new WebSocket.Server({
  server: app.listen(8080)
});

console.log("Listening to new connections on port 8080...")
server.on('connection', socket => {
  socket.on('message', message => {
    let actual_message = JSON.parse(message);
    server.clients.forEach(client => {
      client.send(`${actual_message.name}: ${actual_message.msg}`);
    });
    console.log(`received ${message}`);
  });
  socket.send(`You are now connected to the chat application! ${server.clients.size-1} other people are online`);
});

module.exports = app;
