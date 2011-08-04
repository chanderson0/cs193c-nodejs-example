var express = require('express');
var app = express.createServer(express.logger());

// Let the server know we want to use templates
// with the rendering engine ejs.
app.set('view engine', 'ejs');

// Set the views directory, these are the
// templates that will be rendered
app.set('views', __dirname + '/views');

// Tell Express we want to serve static files from
// a particular directory, in this case ./public
app.use(express.static(__dirname + '/public'));

// This is to get POST requests working.
// We want to parse request bodies, so that we
// can use their parameters.
app.use(express.bodyParser());
app.use(express.methodOverride());

app.get('/', function(req, res) {
  var name = req.param('name');
  if (name == null)
    name = 'Unknown User'

  res.render('index', { name: name });
});

app.post('/form_action', function(req, res) {
  var username = req.body.username;
  if (username == null)
    res.redirect('/')
  else
    res.render('after_login', { username: username });
});

var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log("Listening on " + port);
});