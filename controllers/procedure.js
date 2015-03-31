'use strict';
var Bill = require('../models/bill.js');
var _ = require('underscore');

module.exports = {

  search: function(req, res, next) {
	var zipcode = req.body.zip;
	var cpt = req.body.cpt;
	var description = req.body.description;
	var year = req.body.year;
	var provider = req.body.provider;

	var page = req.body.page;
	var pagesize = req.body.pagesize;

	var searchparams = {};

	if (zipcode != undefined) {
		searchparams.zip = zipcode;
	}

	if (cpt != undefined) {
		searchparams["procedures.cpt.code"] = new RegExp(cpt, "gi");
	}

	if (description != undefined) {
		searchparams["procedures.cpt.description"] = new RegExp(description, "gi");
	}

	if (provider != undefined) {
		searchparams.providerName = new RegExp(provider, "gi");
	}

	if (year != undefined) {
		searchparams.billDate = {
			$gte: new Date(year, 1, 1),
			$lt:  new Date(year+1, 1, 1)
		};
	}

	if (page != undefined || page <= 0) {
		page = 1;
	}

	if (pagesize != undefined || pagesize > 100) {
		pagesize = 10;
	}

	Bill
	  .find(searchparams)
	  .skip((page-1) * pagesize)
	  .limit(pagesize)
      .execQ()
      .then(function (bills) {
      	var result = [];
      	_.each(bills, function(bill) {
      		_.each(bill.procedures, function(procedure) {
				var p = {};
				p.zip = bill.zip;
				p.billDate = bill.billDate;
				p.providerName = bill.providerName;
				p.cptcode = procedure.cpt.code;
				p.cptdescription = procedure.cpt.description;
				p.cost = procedure.cost;
				p.quantity = procedure.quantity;
				result.push(p);     			
      		});
      	});
        res.send(result); 
    }).done();
  }
};

