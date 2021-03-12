const router = require('express').Router();
const usersCtrl = require('../controllers/users');

// GET /users
router.get('/users', usersCtrl.index);

// custom authorization middleware function
function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) return next();
  // req.isAuthenticated function is given to us by passport
  res.redirect('/auth/google');
}

module.exports = router;