'use strict';

var CPT = require('../models/cpt.js');

module.exports = {
  single: function(req, res, next) {
    res.send('single');
  },

  search: function(req, res, next) {
    console.log('here');
    var code = req.body.code;
    var description = req.body.description;
    var page = req.body.page;
    if (page === undefined) {
      page = 0;
    }
    var pagesize = req.body.pagesize;
    if ((pagesize === undefined) || (pagesize > 100)) {
      pagesize = 10;
    }
    CPT.find({
        code: new RegExp(code, "gi"),
        description: new RegExp(description, "gi")
      }, {
        _id: 0,
        code: 1,
        description: 1
      }, {
        skip: page * pagesize,
        limit: pagesize
      })
      .sort({
        priority: -1,
        code: 1
      })
      .then(function(data) {
        res.send(data)
      });
  }
};
