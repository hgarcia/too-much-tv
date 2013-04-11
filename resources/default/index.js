
module.exports = function (app) {
  app.get('/', index);
  app.get('/shows', shows);
};

function index(req, res) {
  var shows = [
    {id: "some", title: "Go Jays", dow: "Friday", season: 5, next_episode: 10}
  ];
  res.render('index', { shows: shows});
}
function shows(req, res) {
  res.render('videos', { title: 'The Bicho - Videos' });
}
