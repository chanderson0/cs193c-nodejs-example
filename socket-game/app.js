// Required dependancies
var io = require('socket.io');
var express = require('express');

// Start both express and socket.io
var app = express.createServer();
var socket = io.listen(app);

// Configure socket for production.
// You can ignore this if you're running locally.
socket.configure('production', function(){
  socket.enable('browser client minification');  // send minified client
  socket.enable('browser client etag');          // apply etag caching logic based on version number
  socket.set('log level', 1);                    // reduce logging
  socket.set('transports', [                     // enable all transports (optional if you want flashsocket)
      'websocket'
    , 'flashsocket'
    , 'htmlfile'
    , 'xhr-polling'
    , 'jsonp-polling'
  ]);

  console.log("Starting on production.");
});

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
var playerID = 1, itemID = 1;
var players = {};
var items = {}, nItems = 0;
var xMax = 500, yMax = 500;

// Make a socket
var raphael = socket
// In a room called raphael
  .of('/raphael')
// When we connect, get this set up
  .on('connection', function (socket) {
    //Set up this new member.
    socket.nickname = 'player' + playerID++;
    position = {
      x: Math.random() * xMax,
      y: Math.random() * yMax
    };

    // Store the new player in the players array.
    players[socket.nickname] = {
      nickname: socket.nickname,
      position: position,
      score: 0
    };

    // On join, notify where you should be.
    socket.emit('me-join', {
      nickname: socket.nickname,
      items: items,
      players: players
    });

    // Let everyone know someone joined.
    raphael.emit('join', players[socket.nickname]);

    // If we move, let everyone know.
    socket.on('move', function (data) {
      // Update my position.
      players[socket.nickname].position = data;

      // Let everyone know, probably.
      raphael.volatile.emit('move', { 
        nickname: socket.nickname, 
        position: data 
      });
    });

    // Collect items. We're totally dependent on the client here.
    socket.on('collect-item', function (data) {
      id = data.id;

      // Can only collect an item that exists, and the first
      // player to claim it, gets it.
      if (items[id]) {
        players[socket.nickname].score += data.score;
        delete items[id];
        nItems--;

        // Let everyone know an item was picked up and who did it.
        raphael.emit('item-collected', {
          id: id,
          nickname: socket.nickname,
          score: players[socket.nickname].score
        });
      }
    });

    // When we leave, let everyone know that too.
    socket.on('disconnect', function() {
      delete players[socket.nickname];
      raphael.emit('leave', { nickname: socket.nickname });
    });
  });

//--------------
//  GAME LOGIC
//--------------

// Add items to the board regularly.
setInterval(function() {
  if (nItems < 15) {
    id = 'item'+itemID++;
    radius = Math.floor(Math.random() * 10 + 10);
    item = {
      id: id,
      x: Math.floor(Math.random() * xMax),
      y: Math.floor(Math.random() * yMax),
      color: '#fff',
      radius: radius,
      score: radius
    };

    items[id] = item;
    nItems++;

    raphael.emit('add-item', item);
  }
}, 500);
