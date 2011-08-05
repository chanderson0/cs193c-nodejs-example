// Required dependancies
var io = require('socket.io');
var express = require('express');

// Start both express and socket.io
var app = express.createServer();
var socket = io.listen(app);

// We're only using Express to serve public files anyway
app.use(express.static(__dirname + '/public'));

var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log("Listening on " + port);
});

var id = 1;
var positions = {};
var xMax = 500, yMax = 500;

var raphael = socket
  .of('/raphael')
  .on('connection', function (socket) {
    // Send everyone else's positions.
    socket.emit('positions', positions);

    //Set up this new member.
    socket.nickname = id++;
    positions[socket.nickname] = {
      x: Math.random() * xMax,
      y: Math.random() * yMax
    };

    socket.emit('me-join', {
      nickname: socket.nickname,
      position: positions[socket.nickname]
    });

    // Let everyone know someone joined.
    raphael.emit('join', { 
      nickname: socket.nickname, 
      position: positions[socket.nickname]
    });

    // If we move, let everyone know.
    socket.on('move', function (data) {
      // Update my position.
      positions[socket.nickname] = data;

      console.log(positions);

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
