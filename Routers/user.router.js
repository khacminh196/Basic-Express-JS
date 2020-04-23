var express = require('express');
var router = express.Router();
var controller = require('../Controllers/user.controller');

router.get('/', controller.index);

router.get('/create', controller.create);

router.post('/create', controller.postCreate);

module.exports = router;