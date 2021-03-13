const express = require('express');
const router = express.Router();
const reviewsCtrl = require('../controllers/reviews');

// post review on bean
router.post('/beans/:id/reviews', reviewsCtrl.create)

// delete review 
router.delete('/reviews/:id', reviewsCtrl.delete)

module.exports = router;