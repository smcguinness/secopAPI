'use strict';

var CPT = require('../models/cpt.js');

module.exports = {

  single: function(req, res, next) {
	res.send('single');
  },

  search: function(req, res, next) {
	var code = req.body.code;
	var description = req.body.description;
	var skip = req.body.skip;
	if (skip === undefined) {
		skip = 0;
	}
	var limit = req.body.limit;
	if ((limit === undefined) || (limit > 100)) {
		limit = 10;
	}
	CPT
		.find({code: new RegExp(code, "gi"),
			description: new RegExp(description, "gi")},
			{_id: 0, code: 1, description: 1},
			{skip: skip, limit: limit})
		.then(function(data){res.send(data)});
  }

};

