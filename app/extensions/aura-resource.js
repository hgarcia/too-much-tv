define({
  require: {
    paths: { jquery: 'bower_components/jquery/jquery'},
    shim:  { jquery: { exports: 'jquery' } }
  },
  initialize: function(app) {
    var j = require('jquery');
    app.sandbox.get = function (name, query, done) {
      return j.getJSON("/api/" + name, query, done);
    };
    app.sandbox.post = function (name, data, done) {
      return j.post("/api/" + name, data, done);
    };
    app.sandbox.put = function (name, id, data, done) {
      j.ajax({
        type: "PUT",
        url: "/api/" + name + "/" + id,
        data: data,
        success: done
      });
      return j.post("/api/" + name + "/" + id, data, done);
    };
    app.sandbox.delete = function (name, id, done) {
      j.ajax({
        type: "DELETE",
        url: "/api/" + name + "/" + id,
        success: done
      });
    };
  }
});
