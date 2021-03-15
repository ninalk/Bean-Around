const express = require('express');
const router = express.Router();
const reviewsCtrl = require('../controllers/reviews');

// post review on bean
router.post('/beans/:id/reviews', isLoggedIn, reviewsCtrl.create)

// delete review 
router.delete('/reviews/:id', isLoggedIn, reviewsCtrl.delete)

// custom authorization middleware function
function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) return next();
  // req.isAuthenticated function is given to us by passport
  res.redirect('/auth/google');
}

module.exports = router;