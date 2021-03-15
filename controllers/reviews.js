const Bean = require('../models/bean');

module.exports = {
  create,
  delete: deleteReview
}

function create(req, res) {
  Bean.findById(req.params.id, function(err, bean) {
    bean.reviews.push(req.body);
    console.log(bean, ' this is the updated bean')

    bean.reviews[bean.reviews.length - 1].userId = req.user._id;
    bean.save(function(err) {
      res.redirect(`/beans/${bean._id}`);
    });
  });
}

function deleteReview(req, res) {
  console.log(req.params.id, 'this is the id')
  Bean.findOne({'reviews._id': req.params.id}, function(err, bean) {
    const reviewSubDoc = bean.reviews.id(req.params.id);
    
    if(!reviewSubDoc.userId.equals(req.user._id)) return res.redirect(`/beans/${bean._id}`);

    reviewSubDoc.remove();
    
    bean.save(function(err) {
      res.redirect(`/beans/${bean._id}`);
    });
  });
}