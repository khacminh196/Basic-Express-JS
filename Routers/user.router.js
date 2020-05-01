var express = require('express');
var multer  = require('multer')

var upload = multer({ dest: 'public/uploads/' })
var router = express.Router();

var controller = require('../Controllers/user.controller');
var validate = require('../Validate/user.validate');

router.get('/', controller.index);

router.get('/create', controller.create);

router.post('/create', upload.single('avatar'), validate.create, controller.postCreate);

router.get('/search', controller.search);

router.get('/:id', controller.view);

module.exports = router;