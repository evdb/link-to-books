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


function privateCache (req,res,next) {
  res.header('Cache-Control', 'private, max-age=600');
  next();
}



var geoip_database_path = path.resolve(__dirname + '/../var/GeoIP.dat');
var country             = new geoip.Country( geoip_database_path );
var fallback_ip         = '217.64.234.65'; // nhs.uk

app.get('/api/about_me', privateCache, function (req, res, next) {
  var ip = req.ip;
  if (!ip || ip == '127.0.0.1') ip = fallback_ip;
  
  country.lookup(ip, function(err, data) {
    if (err) {
      
      // This means that the IP address could not be looked up. Not an error for us.
      if (err.message != 'Data not found') return next(err);

      // set blank entries
      data = {
        country_name:   "",
        country_code:   "",
        country_code3:  "",
        continent_code: "",
      };
    }
    
    data.ip  = ip;
    // data.ips = req.ips;
    res.json(data);
  });
  
});


module.exports = app;
