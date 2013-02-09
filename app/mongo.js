var mongo = require('mongodb-wrapper')
exports.ID = mongo.ObjectID;
exports.create = function (options, collection) {
  var db = mongo.db(options.host, options.port, options.dbname, options.prefix, options.username, options.password);
  return db;
};
// db.collection('posts')

// db.posts.save({title: "A new post", body: "Here is some text"}, function(err, post) {
//   db.posts.findOne({_id: doc._id}, function(err, post) {
//     db.posts.find().limit(1).toArray(function(err, posts) {
//       // posts[0].title == "A new post"
//     })
//   })
// })
