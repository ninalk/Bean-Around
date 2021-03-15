var express = require('express');
var router = express.Router();
const beansCtrl = require('../controllers/beans');

// view all user's rated coffee beans
router.get('/', isLoggedIn, beansCtrl.index);

// view a form to add a bean
router.get('/new', isLoggedIn, beansCtrl.new);

// post the new bean
router.post('/', isLoggedIn, beansCtrl.create);

// show bean post
router.get('/:id', isLoggedIn, beansCtrl.show);

// delete bean entry
router.delete('/:id', isLoggedIn, beansCtrl.delete);

// custom authorization middleware function
function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) return next();
  // req.isAuthenticated function is given to us by passport
  res.redirect('/auth/google');
}

module.exports = router;