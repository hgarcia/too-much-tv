define(['text!./header.hbs'], function (template) {
  return {
    initialize: function () {
      this.sandbox.addTpl('header', template);
      var model = {
        items: [
          {url: "#/shows", name: "Shows", ev: "nav.shows"},
          {url: "#/genres", name: "Genres", ev: "nav.genres"},
          {url: "#/sources", name: "Sources", ev: "nav.sources"}
        ]
      };
      this.render(model);
      this.register();
    },
    render: function (model) {
      var html = this.sandbox.render('header', model);
      this.html(html);
    },
    register: function () {
      var that = this;
      that.$find('li a').each(function () {
        var e = $(this)
        e.click(function () {
          that.sandbox.emit(e.attr("data-event"));
        });
      });
    }
  };
});
