var express = require('express');

var app = express();
app.get('/', function(req,res){
  res.send('<a href="users">Users</a>');
});
app.get('/users', function(req,res){
  res.send('users');
});

module.exports = app;
