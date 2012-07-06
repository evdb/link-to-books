


all: node-modules css geoip


node-modules:
	npm install
	npm prune

npm-shrinkwrap:
	npm install
	rm -f npm-shrinkwrap.json
	npm install
	npm prune
	npm shrinkwrap


geoip: var/GeoIP.dat
var/GeoIP.dat:
	mkdir -p var
	curl -o var/GeoIP.dat.gz http://geolite.maxmind.com/download/geoip/database/GeoLiteCountry/GeoIP.dat.gz
	gunzip -v var/GeoIP.dat.gz


css:
	compass compile


clean:
	compass clean
	find . -name chromedriver.log -delete




.PHONY: all node-module npm-shrinkwrap geoip css clean

