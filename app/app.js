require(['bower_components/aura/lib/aura'], function(Aura) {
  Aura()
    .use('extensions/aura-handlebars')
    .use('extensions/aura-resource')
    .start({ components: 'body' }).then(function() {
      console.warn('Tm-TV started...');
    });
});
