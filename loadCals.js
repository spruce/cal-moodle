var ical = require('ical');
var config = require('./config');
var fs = require('fs');
var cal = require('ical-generator')();


var config = require('./config');
var gnt = require('./helper').getNiceTime;
var helper = require('./helper');

module.exports = function loadCal(username, id, hash) {
  // not looking whether the config for that exists, b/c were are calling it only internally
  ical.fromURL(config.user[username].cals[id].url, {}, function(err, data) {
    cal.clear();
    cal.setDomain(config.cal.domain + '/' + config.user[username].cals[id].name).setName(config.user[username].cals[id].name).setProdID(config.cal.prodID);
    var count = 0;
    for (var k in data) {
      if (data.hasOwnProperty(k)) {
        var ev = data[k];
        if (ev.start == undefined || ev.type !== 'VEVENT') {
          continue;
        }

        if (helper.shouldFilter(config.user[username].cals[id].filters, ev.summary)) {
          count++;
          continue;
        }

        var body = helper.replace(config.user[username].cals[id].replacements, ev.summary, 4)

        cal.addEvent({
          start: ev.start,
          end: ev.end,
          summary: body,
          description: ev.description,
          location: ev.location,
        });
      }
    }
    var addition = (hash) ? "." + hash : "";
    (function(username, id, count) {
      cal.save(__dirname + "/plans/" + username + "/" + id + addition + ".ics", function(err) {
        if (err) {
          console.log('Error:', err);
        } else {
          console.log(gnt() + ":\tThe file for " + username + "/" + id + " was saved! Es wurden " + count + " Ereignisse übersprungen\tNext ReDownload in 1 hour.");
          cal.clear();
        }
      });
    })(username, id, count);
  });
}
