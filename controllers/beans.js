const Bean = require('../models/bean');

module.exports = {
  index,
  new: newBean,
  create,
  show,
  delete: deleteBean
}

function index(req, res) {
  Bean.find({}, function(err, beans) {
    res.render('beans/index', { beans });
  });
}

function newBean(req,res) {
  res.render('beans/new');
}

function create(req, res) {
  
  req.body.fairTrade = !!req.body.fairTrade;
  req.body.usdaOrganic = !!req.body.usdaOrganic;
  req.body.utzCertified = !!req.body.utzCertified;
  req.body.rainforestAlliance = !!req.body.rainforestAlliance;
  req.body.smithosonianBF = !!req.body.smithosonianBF;
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key];
  }

  const bean = new Bean(req.body);
  // assign the logged in user's id
  bean.userId = req.user._id;
  bean.save(function(err) {
    if (err) return res.render('beans/new');
    
    res.redirect('/beans');
  })
}

function show(req, res) {
  Bean.findById(req.params.id, function(err, bean) {
    res.render('beans/show', { bean });
  });
}

function deleteBean(req, res) {
  Bean.findByIdAndDelete(req.params.id, function() {
    res.redirect('/beans');
  })
}