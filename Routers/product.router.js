var express = require('express');
var router = express.Router();

var controller = require('../Controllers/product.controller');

router.get('/', controller.index);
router.get('/search', controller.search);
router.get('/create', controller.create);
router.post('/create', controller.postCreate);
router.get('/delete/:id', controller.delete);
router.get('/view/:id', controller.view);

module.exports = router;