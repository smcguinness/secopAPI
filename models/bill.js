'use strict';

var mongoose = require('mongoose-q')(require('mongoose'));
var db = require('../db/connection.js');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var Q = require('q');


var Bill = db.model('Bill', new Schema({
  _id: mongoose.Schema.Types.ObjectId,
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