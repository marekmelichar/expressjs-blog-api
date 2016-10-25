var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.sender('genres/index');
});

module.exports = router;
