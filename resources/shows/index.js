

module.exports = function (app) {
  app.get('/api/shows', list);
  app.post('/api/shows', create);
};

function create(req, res) {
  var shows = require('./model').init(req.app.db);
  shows.create(req.body, function (err, result) {
    res.send(204);
  });
}

function list(req, res) {
  var shows = require('./model').init(req.app.db);
  shows.findAll(function (err, results) {
    console.log(results);
    res.send(results);
  });
}
