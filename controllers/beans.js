const Bean = require('../models/bean');

module.exports = {
  index,
  new: newBean,
  create
}

function index(req, res) {
  console.log('testinggg')
  Bean.find({}, function(err, beans) {
    console.log(beans, ' this is the bean doc')
    res.render('beans/index', { beans });
  });
}

function newBean(req,res) {
  res.render('beans/new');
}

function create(req, res) {
  
  const bean = new Bean(req.body);
  console.log(bean, ' THIS IS THE beanDoc')
  // assign the logged in user's id
  bean.user = req.user._id;
  bean.save(function(err) {
    if (err) return res.render('beans/new');
    
    res.redirect('/beans');
  })
}