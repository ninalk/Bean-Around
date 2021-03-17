const Bean = require('../models/bean');

module.exports = {
  create,
  delete: deleteReview
}

function create(req, res) {
  Bean.findById(req.params.id, function(err, bean) {
    bean.reviews.push(req.body);
    
    // const date = bean.reviews[bean.reviews.length - 1].reviewDate;
    // const reviewDate = date.toISOString().slice(0, 10);
    // console.log(reviewDate, ' this is the date!')
    
    bean.reviews[bean.reviews.length - 1].userId = req.user._id;
    console.log(bean, ' this is the updated bean')

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