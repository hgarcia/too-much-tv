define(['text!./new.hbs'], function (template) {
  var templateId = 'new-show';
  return {
    initialize: function () {
      this.sandbox.addTpl(templateId, template);
      this.render();
      this.emits();
      this.listens();
    },
    emits: function () {
      // var self = this;
      // self.$find('a').each(function () {
      //   var e = $(this)
      //   e.click(function () {
      //     self.sandbox.emit(e.attr("data-event"));
      //   });
      // });
    },
    listens: function () {
      var self = this;
      function hide() {
        self.$el.hide();
      }
      function show() {
        self.$el.show();
      }
      self.sandbox.on('nav.genres', hide);
      self.sandbox.on('nav.sources', hide);
      self.sandbox.on('nav.new.show', show);
      self.sandbox.on('nav.shows', hide);
    },
    render: function (model) {
      var html = this.sandbox.render(templateId, model);
      this.html(html);
    }
  };
});
