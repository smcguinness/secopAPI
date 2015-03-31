'use strict';

var CPT = require('../models/cpt.js');


module.exports = {
  populateDB: function() {
    var fs = require('fs');
    var async = require('async');
    var codes = require('./codes.json');
    async.each(codes, function(code, cb){ 
      var cpt = new CPT(code);
      cpt.save(cb);
    }, function() {
      CPT.count(function(err, count) {
        console.log('count', count);
      })
      return;
      fs.writeFileSync(__dirname+'/index.json', JSON.stringify({
        index: index + increment
      }));
    })
  }
};

