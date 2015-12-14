var ical = require('ical');

var express = require('express');
var fs = require('fs');
var config = require('./config');
var loadCals = require('./loadCals');
var gnt = require('./helper').getNiceTime;
var logDNS = require('./helper').logDNS;
var _ = require('underscore');
var app = express();



// check whether all path are reachable
_.each(config.user, function(user, userName, list) {
  fs.exists(__dirname + "/plans/" + userName + "/", function(exists) {
    console.log(userName, exists);
    if (!exists) {
      fs.mkdirSync(__dirname + "/plans/" + userName + "/")
    }
    _.each(user.cals, function(cal, calIndex) {
      loadCals(userName, calIndex);
      setInterval(function() {
        loadCals(userName, calIndex)
      }, 3600000);
    })
  });

});

console.log(gnt() + ":\tStarting Server");

app.get('/', function(req, res) {
  logDNS(req);
  res.send('A page with great calenders functions. (WIP)');
});

app.get('/debug', function(req, res) {
  loadCals('spruce', 0, null, true); // test
  logDNS(req);
  res.send('debug');
})

app.get('/cal/:username/:id/:hash?', function(req, res) {
  logDNS(req);
  var addition = (req.params.hash) ? "." + req.params.hash : "";
  res.download(__dirname + "/plans/" + req.params.username + "/" + req.params.id + addition + ".ics",
    req.params.username + "." + req.params.id + ".ics",
    function(err) {
      if (err && err.code == 'ENOENT') {
        console.log(gnt() + ":\t404: " + req.params.username + "/" + req.params.id + addition + ".ics");
        res.send(404);
      } else if (err) {
        console.log(gnt() + ":\tError occured while trying to download " + req.params.username + "/" + req.params.id + addition + ".ics\n The Error code is " + err.code + "\n Stack: " + err.stack + "Whole err obj: ", err);
        res.send(500);
      }
    })
});
app.get('/user/:username', function(req, res) {
  res.send(req.params.username);
});

app.use('/admin/99jke/', function(req, res, next) {
  logDNS(req, 'ADMIN: ');
  next();
});
app.use('/admin/99jke/', require('./admin'));
app.listen(1337, 'localhost');
console.log(gnt() + ":\tServer running at http://localhost:1337/");
