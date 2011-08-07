var express = require('express');
var app = express.createServer(express.logger());

// We're only using Express to serve a static directory.
app.use(express.static(__dirname + '/public'));

// Start the server.
var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log("Listening on " + port);
});