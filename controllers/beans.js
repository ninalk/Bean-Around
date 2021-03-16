const Bean = require('../models/bean');

module.exports = {
  index,
  new: newBean,
  create,
  show,
  delete: deleteBean,
  edit,
  update
}

// Find beans that match userId to display users beans only
function index(req, res, next) {
  Bean.find({'userId': req.user._id}, function(err, beans) {
    res.render('beans/index', { 
      beans, 
    });
  });
}

// Show a form to add a new bean
function newBean(req,res) {
  res.render('beans/new');
}

// Use form to create a new bean entry
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
  });
}

// Show the details of each bean entry
function show(req, res) {
  Bean.findById(req.params.id, function(err, bean) {
    res.render('beans/show', { bean });
  });
}

// Delete a a bean entry
function deleteBean(req, res) {
  Bean.findByIdAndDelete(req.params.id, function() {
    res.redirect('/beans');
  })
}

// View a form to edit bean entry
function edit(req, res) {
  Bean.findById(req.params.id, function(err, bean) {
    if (!bean.userId.equals(req.user._id)) return res.redirect('/beans');
    res.render('beans/edit', { bean });
  });
}

// Update bean entry form
function update(req, res) {
  Bean.findById(req.params.id, function(err, bean) {
    if(!bean.userId.equals(req.user._id)) return res.redirect('/beans');
    // Update body of the form
    console.log(req.body, ' BODY!')

    bean.roaster = req.body.roaster;
    bean.blendName = req.body.blendName;
    bean.region = req.body.region;
    bean.roast = req.body.roast;
    bean.fairTrade = !!req.body.fairTrade;
    bean.usdaOrganic = !!req.body.usdaOrganic;
    bean.utzCertified = !!req.body.utzCertified;
    bean.rainforestAlliance = !!req.body.rainforestAlliance;
    bean.smithosonianBF = !!req.body.smithosonianBF;

    bean.save(function(err) {
      if (err) return res.render('beans/edit');
      // redirect back to bean's show view to ensure updates made
      res.redirect(`/beans/${bean._id}`);
    })
  })
}
