module.exports = function (app) {
  app.get('/api/shows', list);
};

function list(req, res) {
  res.send([{id: '1', name: 'Doc Martin', source: 'Netflix', genre: 'Comedy', last_watched_serie: 3, last_watched_episode: 6}]);
}
