'use strict';

var mongoose = require('mongoose');
var db = require('../db/connection.js');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var Q = require('q');


var Bill = db.model('Bill', new Schema({
  docName: String,
  billDate: Date,
  zip: Number,
  procedures: [{
    CPT: String,
    Cost: Number,
    who: String //Doctor or hospital
  }]
}));

module.exports = Bill;