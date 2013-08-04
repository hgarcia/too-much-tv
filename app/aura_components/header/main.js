define(['text!./header.hbs'], function(template) {
  return {
    initialize: function() {
      this.html(template);
      this.$el.find('a').on('click', _.bind(this.browse, this));
    },
    browse: function (ev) {
      var uri = ev.target.hash;
      this.sandbox.emit('tmtv.browse', {route: uri});
    }
  };
});
