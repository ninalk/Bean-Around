const Bean = require('../models/bean');

module.exports = {
  create,
  delete: deleteReview
}

// Add a review to a bean entry
function create(req, res) {
  Bean.findById(req.params.id, function(err, bean) {
    if (!bean.userId.equals(req.user._id)) return res.redirect(`/beans/${bean._id}`);

    bean.reviews.push(req.body);
    bean.reviews[bean.reviews.length - 1].userId = req.user._id;
        
    bean.save(function(err) {
      res.redirect(`/beans/${bean._id}`);
    });
  });
}

// Delete review
function deleteReview(req, res) {
  Bean.findOne({'reviews._id': req.params.id}, function(err, bean) {
    const reviewSubDoc = bean.reviews.id(req.params.id);
    
    if(!reviewSubDoc.userId.equals(req.user._id)) return res.redirect(`/beans/${bean._id}`);
    reviewSubDoc.remove();
    
    bean.save(function(err) {
      res.redirect(`/beans/${bean._id}`);
    });
  });
}