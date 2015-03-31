'use strict';

var mongoose = require('mongoose-q')(require('mongoose'));
var db = require('../db/connection.js');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var Q = require('q');


var Bill = db.model('Bill', new Schema({
  providerName: String,
  billDate: {type: Date, required: 'The bill date is required.'},
  zip: {type: Number, required: 'The zip code is required.'},
  generalDescription: String,
  procedures: [{
    cpt: {
      code: {type: String, required: 'The CPT code for the procedure is required.'},
      description: {type: String, required: 'The CPT description for the procedure is required.'},
    },
    cost: {type: Number, required: 'The cost of the procedure is required.', min: 0},
    quantity: {type: Number, default: 1, min: 1}
  }]
}));

module.exports = Bill;