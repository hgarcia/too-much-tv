var db = require('./mongo');
var config = require('./config').CONFIG.DBS.main;

function result(res, success, error) {
  return function (err, result) {
    console.log(err);
    console.log(result);
    if (err) {
      res.send(error, err);
    } else if (result) {
      res.send(success, result);
    } else if (result === undefined) {
      res.send(success);
    } else {
      res.send(404);
    }
  };
}

module.exports = {
  shows: function () {
    var dbs = db.create(config).collection('shows');
    return {
      single: function (req, res) {
        var id = req.params.id;
        dbs.findById({"_id": db.ID(id)}, result(res, 200, 404));
      },
      list: function (req, res) {
        dbs.find().sort({"name": 1}).toArray(result(res, 200, 404));
      },
      save: function (req, res) {
        var show = req.body;
        dbs.save(show, result(res, 201, 409));
      },
      remove: function (req, res) {
        var id = req.params.id;
        dbs.remove({"_id": db.ID(id)}, result(res, 204, 204));
      }
    };
  }
};
