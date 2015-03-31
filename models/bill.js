'use strict';

var mongoose = require('mongoose-q')(require('mongoose'));
var db = require('../db/connection.js');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var Q = require('q');


var Bill = db.model('Bill', new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  docName: {type: String, required: 'The doctor or hospital name is required.'},
  billDate: {type: Date, required: 'The bill date is required.'},
  zip: {type: Number, required: 'The zip code is required.'},
  procedures: [{
    CPT: {type: String, required: 'The CPT code is require.'},
    Cost: {type: Number, required: 'The cost of the procedure is required.'},
    who: {type: String, required: 'Who did the procedure is required.'} //Doctor or hospital
  }]
}));

module.exports = Bill;