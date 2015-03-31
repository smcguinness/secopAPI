'use strict';
var Bill = require('../models/bill.js');
var CPT = require('../models/cpt.js');
var async = require('async');

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
    var billData = req.body;
    if(!Array.isArray(billData.procedures) || !billData.procedures.length) {
      return res.status(404).send({
        message: 'You must include at least one procedure.'
      });
    }

    var cptError;

    var codes = billData.procedures.map(function(procedure) {
      if(!procedure.cpt) {
        cptError = true;
      }
      return procedure.cpt;
    });

    if(cptError) {
      return res.status(404).send({
        message: 'You must include a cpt for your procedure.'
      });
    }

    async.each(codes, function(code, cb) {
      CPT.findOne({
        code: code
      }, function(err, foundCPT) {
        if(err || !foundCPT) {
          cb({
            message: code + ' appears to be an invalid code.'
          });
        } else {
          cb();
        }
      });
    }, function(err) {
      if(err){
        return res.status(404).send(err);
      }

      var bill = new Bill(billData);
      bill.save(function(err) {
        if(err) {
          var errors = [];
          for(var index in err.errors) {
            errors.push(err.errors[index].message);
          }
          return res.status(404).send({
            validationErrors: errors,
            message: 'One or more of your fields are incorrect.'
          });
        }
        res.status(200).send('Thanks!');
      });
    });
  },

  index: function(req, res, next) {
	res.send('index');
  }
};

