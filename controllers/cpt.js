'use strict';

var CPT = require('../models/cpt.js');

module.exports = {

  single: function(req, res, next) {
	res.send('single');
  },

  search: function(req, res, next) {
	var code = req.body;
	res.send(code);
	var description = req.params.description;
	//CPT.find({code: new RegExp(code, "g")}).then(function(data){res.send(data)});
  }

};

