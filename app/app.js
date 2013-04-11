var config = require('./config').CONFIG;
var db = require('./mongo').create(config.DBS.main);
var express = require('express');
var resources = require('node-resources', {});
var http = require('http');
var path = require('path');
var users = require('./models/users').init(db);
var security = require('./models/security').init(users);
var app = express();

app.configure(function () {
  app.set('port', process.env.PORT || 5000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('secretissimo'));
  app.use(express.session({secret: 'kaboom'}));
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.security = security;
app.db = db;
app.config = config;

app.configure('development', function () {
  app.use(express.errorHandler());
});

resources.registerRoutes(app, {path: __dirname + "/resources"});

http.createServer(app).listen(app.get('port'), function () {
  console.log("Express server listening on port " + app.get('port'));
});
