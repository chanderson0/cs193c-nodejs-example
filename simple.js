// Load the express library, which we installed using npm
var express = require('express');

// Create an express server, using the default logger
var app = express.createServer(express.logger());

// This represents a request that you can make to the server.
// In this case, it's a GET request to the root of the server,
// and it always responds with 'Hello World!'
app.get('/', function(request, response) {
  response.send('Hello World!');
});

// This is another GET request, this time to `/hello`. It 
// takes one parameter, `name`. A full request looks like:
// http://HOST/hello?name=Chris
app.get('/hello', function(req, res) {
    res.send('Hello to you, ' + req.param('name') + '!');
});

// One last way to format a GET request in Express. Here,
// we bind the variable :name to part of the URI itself.
// A full request: http://HOST/greetings/Chris
app.get('/greetings/:name', function(req, res) {
    res.send('Greetings to you, ' + req.params.name + '!');
});

// This is where we actually get the server started. We
// default to port 3000, unless the process has another
// port defined, and we log that we are up and running.
var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log("Listening on " + port);
});