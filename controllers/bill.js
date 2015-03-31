'use strict';

var Bill = require('../models/bill.js');

module.exports = {

  single: function(req, res, next) {	
    var id = req.params.id;

    Bill
      .findById(id)
      .exec(function (err, result) { res.send(err); });
  },

  insertNew: function(req, res, next) {
	res.send('insertNew');
  },

  index: function(req, res, next) {
	res.send('index');
  }
};

