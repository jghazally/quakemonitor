quakemonitor
============

A play with GeoNet.co.nz json API for latest quakes

After the scary 6.5 Magnitude Earthquake on 21st
of July 2013 it came to my attention that GeoNet
offers a frequently updated json file of 30 most recent quakes
in the New Zealand area.

Seeing that I, like many other Kiwis around New Zealand were hammering
the GeoNet website every 5 minutes to see the latest quakes I decided to
have a play with their API and setup my own map based quake monitor. The
map shows the most recent quake in green, and the strongest recent quake
in red.

The page does not store any geonet data, it pulls the first 30 recent
quakes from page load then queries the geonet server every second to see
if more quakes have happened.


#Requirements
PHP, if anyone wants to help write this as a jekyll plugin in
ruby please submit a branch.
Google Maps v3 API

#Usage
Clone the repo to your server
`
git clone http://github.com/jghazally/quakemonitor
`

Copy the sample config to config.php
`
cp sample-config.php config.php
`

Replace the xxxxxxx section in the config.php with your Google Maps API
Key
`
define('GOOGLEMAPS_API', 'xxxxxxxxxxxxxxxxx');
`

#jQuery Libraries used
This page uses
1. gmaps.js: http://hpneo.github.io/gmaps/
1. twinkle.jsL http://larsjung.de/twinkle/
