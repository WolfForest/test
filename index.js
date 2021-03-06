var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));
app.use('/public', express.static(__dirname + '/public'));

app.get('*', function(req, res) {
  res.end('Test by Forest');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


