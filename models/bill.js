'use strict';

var mongoose = require('mongoose-q')(require('mongoose'));
var db = require('../db/connection.js');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var Q = require('q');


var Bill = db.model('Bill', new Schema({
  docName: {type: String, required: 'The doctor or hospital name is required.'},
  billDate: {type: Date, required: 'The bill date is required.'},
  zip: {type: Number, required: 'The zip code is required.'},
  generalDescription: String,
  procedures: [{
    cpt: {type: String, required: 'The CPT code for the procedure is required.'},
    cost: {type: Number, required: 'The cost of the procedure is required.', min: 0},
    who: {type: String, required: 'Who did the procedure is required.'}, //Doctor or hospital
    quantity: {type: Number, default: 1, min: 1}
  }]
}));

module.exports = Bill;