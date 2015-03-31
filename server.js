var express = require('express');
var https = require('https');
var config = require('config');
var app = express();
var path = require('path');
var cookieParser = require('cookie-parser');
var port = process.env.PORT || 8000;
var version = require('./package.json').version;
var bodyparser = require('body-parser');
var compress = require('compression');
var Bill = require('./controllers/bill.js');
//var CPT = require('');

require('./db/connection.js');

app.use(compress());
app.use(bodyparser.urlencoded({
  extended: false
}));

app.use(bodyparser.json());
app.use(cookieParser());

app.listen(port, function() {
  console.log('listening on ', port);
});