// Required dependancies
var io = require('socket.io');
var express = require('express');

// Start both express and socket.io
var app = express.createServer();
var sockApp = io.listen(app);

// We're only using Express to serve public files anyway
app.use(express.static(__dirname + '/public'));

// Start Express
var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log("Listening on " + port);
});

// Make a socket
sockApp.sockets.on('connection', function (socket) {
  // Send the news event.
  socket.emit('news', 'CS193C!');

  // Simple event, no callback.
  socket.on('ping', function (data) {
    console.log('Got a ping.');
  });

  // Event has an acknoledgement function.
  socket.on('pong', function (data, fn) {
    console.log('Got a pong.');
    fn('woot');
  });

  // Send 'news' every 2 sec.
  setInterval(function() {
    socket.emit('news', 'Update');
  }, 2000);
});
