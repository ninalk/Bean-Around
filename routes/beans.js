var express = require('express');
var router = express.Router();
const beansCtrl = require('../controllers/beans');

// view all rated coffee beans
router.get('/', beansCtrl.index);

// view a form to add a bean
router.get('/new', beansCtrl.new);

// post the new bean
router.post('/', beansCtrl.create);

// show bean post
router.get('/:id', beansCtrl.show);

// delete bean entry
router.delete('/:id', beansCtrl.delete);

module.exports = router;