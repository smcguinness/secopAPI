var mongoose = require('mongoose');
var CONFIG = require('config');

mongoose.connect(process.env.DB_CONNECTION_URL || CONFIG.dbUrl);