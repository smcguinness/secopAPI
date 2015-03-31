'use strict';

var CPT = require('../models/cpt.js');

module.exports = {

  single: function(req, res, next) {
	res.send('single');
  },

  search: function(req, res, next) {
	res.send('search');
  }

};

