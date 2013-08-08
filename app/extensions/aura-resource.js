define(['jquery'], function (jq) {
  return {
    initialize: function(app) {
      app.sandbox.get = function (name, query, done) {
        return jq.getJSON("/api/" + name, query, done);
      };
      app.sandbox.post = function (name, data, done) {
        return jq.post("/api/" + name, data, done);
      };
      app.sandbox.put = function (name, id, data, done) {
        jq.ajax({
          type: "PUT",
          url: "/api/" + name + "/" + id,
          data: data,
          success: done
        });
        return j.post("/api/" + name + "/" + id, data, done);
      };
      app.sandbox.delete = function (name, id, done) {
        jq.ajax({
          type: "DELETE",
          url: "/api/" + name + "/" + id,
          success: done
        });
      };
    }
  };
});
