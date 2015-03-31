'use strict';

var mongoose = require('mongoose');
var db = require('../db/connection.js');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var Q = require('q');




var CPT = db.model('CPT', new Schema({
  code: String,
  description: String,
  priority: Number
}));

module.exports = CPT;

