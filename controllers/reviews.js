const Bean = require('../models/bean');

module.exports = {
  create,
  delete: deleteReview
}

// Add a review to a bean entry
function create(req, res) {
  Bean.findById(req.params.id, function(err, bean) {
    bean.reviews.push(req.body);
    bean.reviews[bean.reviews.length - 1].userId = req.user._id;
    console.log(bean, ' this is bean')
    // const date = bean.reviews[bean.reviews.length - 1].reviewDate;
    // const brewDate = date.toISOString().slice(0, 10);
    // console.log(brewDate, ' brewDate');
    // date = brewDate;

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