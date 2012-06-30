var app  = require('./lib/app'),
    http = require('http');

http
  .createServer(app)
  .listen(
    app.get('port'),
    function () {
      console.log("Express server listening on http://localhost:" + app.get('port'));
    }
  );
