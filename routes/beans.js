var express = require('express');
var router = express.Router();
const beansCtrl = require('../controllers/beans');

// view all rated coffee beans
router.get('/', beansCtrl.index);

// view a form to add a bean
router.get('/new', beansCtrl.new);

module.exports = router;