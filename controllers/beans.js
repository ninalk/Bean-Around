const Bean = require('../models/bean');

module.exports = {
  index,
  new: newBean
}

function index(req, res) {
  console.log('testinggg')
  Bean.find({}, function(err, beanDocuments) {
    res.render('beans/index', {
      beans: beanDocuments
    });
  });
}

function newBean(req,res) {
  res.render('beans/new');
}