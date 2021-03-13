const Bean = require('../models/bean');

module.exports = {
  create,
  delete: deleteReview
}

function create(req, res) {
  Bean.findById(req.params.id, function(err, bean) {
    bean.reviews.push(req.body);
    console.log(bean, ' this is the updated bean')
    bean.save(function(err) {
      res.redirect(`/beans/${bean._id}`);
    });
  });
}

function deleteReview(req, res) {
  console.log(req.params, 'this is params')
  // Bean.findById(req.params.id, function(err, bean) {
  //   bean.reviews.remove();
    
  //   bean.save(function(err) {
  //     res.redirect(`/beans/${bean._id}`);
  //   });
  // });
}