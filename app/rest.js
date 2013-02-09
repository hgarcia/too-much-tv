var db = require('./mongo');
var config = require('./config').CONFIG.DBS.main;

function result(res, success, error) {
  return function (err, result) {
    if (err) {
      res.send(error, err);
    } else if (result) {
      res.send(success, result);
    } else {
      res.send(404);
    }
  };
}

module.exports = {
  shows: function () {
    var dbs = db.create(config).collection('show');
    return {
      single: function (req, res) {
        var id = req.params.id;
        dbs.findById(id, result(res, 200, 404));
      },
      list: function (req, res) {
        dbs.find().toArray(result(res, 200, 404));
      },
      save: function (req, res) {
        var show = req.body;
        dbs.save(show, result(res, 201, 409));
      },
      remove: function (req, res) {
        var id = req.params.id;
        dbs.remove(id, result(res, 204, 204));
      }
    };
  }
};
