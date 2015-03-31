var mongoose = require('mongoose');
var CONFIG = require('config');

module.exports = mongoose.createConnection(process.env.DB_CONNECTION_URL || CONFIG.dbUrl);