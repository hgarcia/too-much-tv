var fs = require('fs');

module.exports = function (app) {
  app.get('/', index);
};

function index(req, res) {
  res.sendfile('./app/index.html');
}
