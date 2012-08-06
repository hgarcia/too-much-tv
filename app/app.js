var passport = require('passport');
var express = require('express');
var app = express();
var hbs = require('hbs');

app.use(express.logger());
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.session({ secret: 'cranberry juice' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(require('connect-assets')());
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'html');
app.engine('html', hbs.__express);
app.set('views', __dirname + '/views');

var blocks = {};

hbs.registerHelper('extend', function(name, context) {
  var block = blocks[name];
  if (!block) {
    block = blocks[name] = [];
  }
  block.push(context(this));
});

hbs.registerHelper('block', function(name) {
  var val = (blocks[name] || []).join('\n');
  blocks[name] = [];
  return val;
});

hbs.registerHelper('js', js);
hbs.registerHelper('css', css);

var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function(username, password, done) {
    if (username === 'hernan@dynamicprogrammer.com' &&
      password === "11223344") {
      return done(null, {usr: username});
    }
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.usr);
});

passport.deserializeUser(function(id, done) {
  done(null, {user: id});
});

app.get('/', function (req, res) {
  res.render('login-frm');
});

app.post('/', passport.authenticate('local', { failureRedirect: '/', failureFlash: false }),
  function (req, res) {
    res.redirect('/app');
  });

app.get('/app', ensureAuthenticated, function (req, res) {
   res.render('app');
});

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

app.listen(3000);
console.log('Listening on port 3000');

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  return res.redirect('/')
}
