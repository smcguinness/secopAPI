'use strict';

var CPT = require('../models/cpt.js');


module.exports = {
  populateDB: function() {
    
    var async = require('async');
    var codes = require('./codes.json');
    async.each(codes, function(code, cb){ 
      var cpt = new CPT(code);
      cpt.save(cb);
    }, function() {
      CPT.count(function(err, count) {
        if(count === codes.length) {
          console.log('populated correctly!')
        } else {
          console.log('only populated '+count);
        }
      });
    });
  },
  checkDB: function() {
    var async = require('async');
    var codes = require('./codes.json');
    var index = 0;
    async.each(codes, function(code, cb){ 
      CPT.find(code, function(err, foundCode) {
        if(err || !foundCode) {
          console.log('there was an error with this code', code);
        }
        if(index%100 === 0) {
          console.log('at index:', index);
        }
        index++;
        cb();
      });
    }, function() {
      console.log('done');
    });
  }
};

