var moment = require('moment');
var _ = require('underscore');

function stringToArray(str) {
  if (str && str.split) {
    return _.map(str.split(","), function (s) { s.trim()});
  }
  return [];
}

exports.init = function (db) {
  var shows = db.collection('shows');
  return {
    create: function (dto, cb) {
      var show = {
        name: dto.name,
        source: dto.sources,
        genre: dto.genres,
        last_watched_serie: parseInt(dto.serie, 10),
        last_watched_episode: parseInt(dto.episode, 10)
      };
      shows.save(show, {safe: true}, cb);
    },
    findAll: function (cb) {
      shows.find({}).toArray(cb);
    },
    find: function (query, cb) {
      shows.find(query).toArray(cb);
    },
    findById: function(id, cb) {
      shows.findById(id, cb);
    }
  };
};
