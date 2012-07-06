var express = require('express');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set("trust proxy", true);
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/../public'));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/what_is_my_ip', function (req,res) {
  // http://stackoverflow.com/questions/5999379
  res.json({
    ip: req.ip,
    ips: req.ips
  });
});

module.exports = app;