define({
  require: {
    paths: { handlebars: 'bower_components/handlebars/handlebars'},
  },
  initialize: function(app) {
    var tpls = [];
    app.sandbox.addTpl = function (name, src) {
      tpls[name] = Handlebars.compile(src);
    };
    app.sandbox.render = function (name, data) {
      return tpls[name](data);
    }
  }
});
