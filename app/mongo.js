var mongo = require('mongodb-wrapper')
exports.ID = mongo.ObjectID;
exports.create = function (options, collection) {
  var db = mongo.db(options.host, options.port, options.dbname, options.prefix, options.username, options.password);
  return db;
};
