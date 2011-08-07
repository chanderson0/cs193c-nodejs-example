var express = require('express');
var app = express.createServer(express.logger());

// Let the server know we want to use templates
// with the rendering engine ejs. 
// More info on EJS here: http://embeddedjs.com/
app.set('view engine', 'ejs');

// Set the views directory, these are the templates that 
// will be rendered later. This directory also includes
// `layout.ejs` in which all templates are rendered.
app.set('views', __dirname + '/views');

// Tell Express we want to serve static files from a 
// particular directory, in this case `./public`. In 
// this app, we're serving the CSS files from `./public/css`
app.use(express.static(__dirname + '/public'));

// This is to get POST requests working. We want to parse 
// request bodies, so that we can use their parameters.
app.use(express.bodyParser());
app.use(express.methodOverride());

// Index
app.get('/', function(req, res) {
  // Look for the `name` parameter, and use a default
  // it it's not set.
  var name = req.param('name');
  if (name == null)
    name = 'Unknown User'
  
  // Render the index template with the variable `name`.
  res.render('index', { name: name });
});

// If you try to log in, you POST to `/form_action`. We
// read the username out of the request body, and render
// a response page. Nothing is actually saved, however.
app.post('/form_action', function(req, res) {
  var username = req.body.username;
  if (username == null)
    res.redirect('/')
  else
    res.render('after_login', { username: username });
});

// Start the server.
var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log("Listening on " + port);
});