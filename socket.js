// Required dependancies
var io = require('socket.io');
var express = require('express');

// Start both express and socket.io
var app = express.createServer();
var socket = io.listen(app);

// We're only using Express to serve public files anyway
app.use(express.static(__dirname + '/public'));

// Start Express
var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log("Listening on " + port);
});

// Store information about our little world.
// IDs are numbers 1,2,3...
// Positions are stored as objects {x:,y:}
// The world is 500x500.
var id = 1;
var positions = {};
var xMax = 500, yMax = 500;

// Make a socket
var raphael = socket
// In a room called raphael
  .of('/raphael')
// When we connect, get this set up
  .on('connection', function (socket) {
    // Send everyone else's positions.
    socket.emit('positions', positions);

    //Set up this new member.
    socket.nickname = id++;
    socket.position = {
      x: Math.random() * xMax,
      y: Math.random() * yMax
    };

    // On join, notify where you should be.
    socket.emit('me-join', {
      nickname: socket.nickname,
      position: socket.position,
      positions: positions
    });

    positions[socket.nickname] = socket.position;

    // Let everyone know someone joined.
    raphael.emit('join', { 
      nickname: socket.nickname, 
      position: positions[socket.nickname]
    });

    // If we move, let everyone know.
    socket.on('move', function (data) {
      // Update my position.
      positions[socket.nickname] = data;

      // Let everyone know, probably.
      raphael.volatile.emit('move', { 
        nickname: socket.nickname, 
        position: data 
      });
    });

    // When we leave, let everyone know that too.
    socket.on('disconnect', function() {
      delete positions[socket.nickname];
      socket.broadcast.emit('leave', { nickname: socket.nickname });
    });
  });
