var express = require('express'),
    geoip   = require('geoip'),
    path    = require('path');

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

// Need to get the database from this url and ungzip it to var/GeoIP.dat
// http://geolite.maxmind.com/download/geoip/database/GeoLiteCountry/GeoIP.dat.gz
var geoip_database_path = path.resolve(__dirname + '/../var/GeoIP.dat');
var country             = new geoip.Country( geoip_database_path );
var fallback_ip         = '217.64.234.65'; // nhs.uk

app.get('/what_is_my_country', function (req, res, next) {
  var ip = req.ip;
  if (!ip || ip == '127.0.0.1') ip = fallback_ip;
  
  country.lookup(ip, function(err, data) {
    if (err) return next(err);
    res.json(data);
  });
  
});

module.exports = app;