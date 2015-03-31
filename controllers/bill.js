'use strict';

var Bill = require('../models/bill.js');

module.exports = {

  single: function(req, res, next) {
	res.send('single');
  },

  insertNew: function(req, res, next) {
	res.send('insertNew');
  },

  index: function(req, res, next) {
	res.send('index');
  }
};

