var mongoose = require('mongoose');
var CONFIG = require('config');

exports.connection = mongoose.createConnection(process.env.DB_CONNECTION_URL || CONFIG.dbUrl);