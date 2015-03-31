'use strict';
var Bill = require('../models/bill.js');
var CPT = require('../models/cpt.js');
var Procedure = require('../models/procedure.js');
var async = require('async');
var url = require('url');
var _ = require('underscore');

module.exports = {

  search: function(req, res, next) {
	var zipcode = req.body.zipCode;
	var cpt = req.body.cpt;
	var description = req.body.description;
	var year = req.body.year;
	var page = req.body.page;
	var pagesize = req.body.pagesize;

	var searchparams = {};

	if (zipcode != undefined) {
		searchparams.zip = zipcode;
	}

	if (cpt != undefined) {
		searchparams.cpt = new RegExp(cpt, "gi");
	}

	if (description != undefined) {
		searchparams.description = new RegExp(description, "gi");
	}

	if (year != undefined) {
		searchparams.billDate = new Date();
		searchparams.billDate.year = year;
	}

	if (page != undefined || page <= 0) {
		page = 1;
	}

	if (pagesize != undefined || pagesize > 100) {
		pagesize = 10;
	}

	console.log(searchparams);
	console.log(page);
	console.log(pagesize);

	Bill
	  .find(searchparams)
	  .skip((page-1) * pagesize)
	  .limit(pagesize)
      .execQ()
      .then(function (bills) {
      	var result = [];
      	_.each(bills, function(bill) {
			console.log(bill);
			var p = new Procedure();
			p.zip = bill.zip;
      	});
        res.send(result); 
    }).done();
  }
};

