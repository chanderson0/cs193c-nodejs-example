var express = require('express');
var app = express.createServer(express.logger());

app.get('/', function(request, response) {
  response.send('Hello World!');
});

app.get('/hello', function(req, res) {
    res.send('Hello to you, ' + req.param('name') + '!');
});

app.get('/greetings/:name', function(req, res) {
    res.send('Greetings to you, ' + req.params.name + '!');
});

var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log("Listening on " + port);
});