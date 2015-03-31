'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var Q = require('q');




var Bill = mongoose.model('Bill', new Schema({
  docName: String,
  billDate: Date,
  address: String
}));

module.export = Bill;

