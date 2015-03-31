'use strict';
var Bill = require('../models/bill.js');
var CPT = require('../models/cpt.js');

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
    var codes = [];

    var codeHashMap = {};

    for(var i = 0; i < billData.procedures.length; i++) {
      var cpt = billData.procedures[i].cpt;
      if(!cpt) {
        return res.status(404).send({
          message: 'You must include a cpt for your procedure.'
        });
        break;
      }
      if(!codeHashMap[cpt]) {
        codeHashMap[cpt] = true;
        codes.push({
          code: cpt
        });
      }
    }

    var foundCPTids = [];

    CPT.find({
      $or: codes
    }, '_id code').lean().execQ()
    .then(function(foundCodes) {
      foundCodes.forEach(function(foundCode) {
        delete codeHashMap[foundCode.code];
        foundCPTids.push({
          _id: foundCode._id
        });
      });
      var codesLeft = Object.keys(codeHashMap);
      if(codesLeft.length) {
        res.status(404).send({
          message: codesLeft.join(', ') + ' are note valid codes.'
        });
      }
      var bill = new Bill(billData);
      return bill.saveQ();
    })
    .then(function() {
      CPT.update({
        $or: foundCPTids
      }, {
        $inc: {
          priority: 1
        }
      }, {
        multi: true
      }, function() {});
      res.status(200).send('Thanks!');
    })
    .catch(function(err) {
      if(err && err.errors) {
        var errors = [];
        for(var index in err.errors) {
          errors.push(err.errors[index].message);
        }
        res.status(404).send({
          validationErrors: errors,
          message: 'One or more of your fields are incorrect.'
        });
      } else {
        res.status(404).send('Not Found');
      }
    })
  },

  index: function(req, res, next) {
	res.send('index');
  }
};

