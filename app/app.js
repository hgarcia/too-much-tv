var express = require('express');
var app = express();
app.use(require('connect-assets')());
app.set('view engine', 'html');
app.engine('html', require('hbs').__express);

app.listen(3000);
console.log('Listening on port 3000');
