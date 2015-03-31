'use strict';

var mongoose = require('mongoose-q')(require('mongoose'));
var db = require('../db/connection.js');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var Q = require('q');


var Search = db.model('Search', new Schema({

}));

module.exports = Search;
