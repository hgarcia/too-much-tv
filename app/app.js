require(['bower_components/aura/lib/aura'], function(Aura) {
  Aura()
    .use('extensions/aura-path')
    .start({ components: 'body' }).then(function() {
      console.warn('Aura started...');
    });
});
