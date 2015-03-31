'use strict';
var Bill = require('../models/bill.js');

module.exports = {

  single: function(req, res, next) {	
    var id = req.params.id;

    Bill
      .findById(id)
      .execQ()
      .then(function (result) {
        res.send(result); 
    }).done();
},

  insertNew: function(req, res, next) {
	res.send('insertNew');
  },

  index: function(req, res, next) {
	res.send('index');
  }
};

