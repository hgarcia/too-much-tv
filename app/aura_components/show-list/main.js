define(['text!./list.hbs'], function (template) {
  var templateId = 'show-list';
  return {
    initialize: function () {
      var self = this;
      self.sandbox.addTpl(templateId, template);
      self.sandbox.get('shows', {}, function (data) {
        self.render({shows: data});
        self.emits();
        self.listens();
      });
    },
    emits: function () {
      var self = this;
      self.$find('a').each(function () {
        var e = $(this)
        e.click(function () {
          self.sandbox.emit(e.attr("data-event"));
        });
      });
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
      self.sandbox.on('nav.new.show', hide);
      self.sandbox.on('nav.shows', show);
    },
    render: function (model) {
      var html = this.sandbox.render(templateId, model);
      this.html(html);
    }
  };
});
