var config = require('./config').CONFIG;
var db = require('./mongo').create(config.DBS.main);
var express = require('express');
var resources = require('node-resources', {});
var http = require('http');
var path = require('path');
var users = require('./models/users').init(db);
var security = require('./models/security').init(users);
var lessMiddleware = require('less-middleware');
var app = express();

app.configure(function () {
  app.set('port', process.env.PORT || 5000);
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('want-some-milk-with-that'));
  app.use(express.session({secret: 'tv-is-tha-bomb'}));
  app.use(app.router);
  app.use(lessMiddleware({
        src: __dirname + '/app',
        paths: [path.join(__dirname, 'app', 'bower_components', 'bootstrap', 'less')],
        debug: true,
        compress: true
    }));
  app.use(express.static(path.join(__dirname, 'app')));
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
