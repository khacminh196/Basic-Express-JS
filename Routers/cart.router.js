var express = require('express');
var router = express.Router();

var controller = require('../Controllers/cart.controller');

router.get('/add/:idProduct', controller.addToCart);

router.get('/', controller.viewCart);

module.exports = router;