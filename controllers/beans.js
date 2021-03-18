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
      title: 'BEAN AROUND',
      beans, 
    });
  });
}

// Show a form to add a new bean
function newBean(req,res) {
  res.render('beans/new', {
    title: 'BEAN AROUND'
  });
}

// Use form to create a new bean entry
function create(req, res) {
  
  req.body.fairTrade = !!req.body.fairTrade;
  req.body.usdaOrganic = !!req.body.usdaOrganic;
  req.body.utzCertified = !!req.body.utzCertified;
  req.body.rainforestAlliance = !!req.body.rainforestAlliance;
  req.body.smithsonianBF = !!req.body.smithsonianBF;
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
    console.log(bean, ' this is BEAN!')
    res.render('beans/show', { title: 'BEAN AROUND', bean });
  });
}

// Delete a a bean entry
function deleteBean(req, res) {
  Bean.findByIdAndDelete(req.params.id, function(err, bean) {
    if (!bean.userId.equals(req.user._id)) return res.redirect('/beans');
    res.redirect('/beans');
  })
}

// View a form to edit bean entry
function edit(req, res) {
  Bean.findById(req.params.id, function(err, bean) {
    if (!bean.userId.equals(req.user._id)) return res.redirect('/beans');
    res.render('beans/edit', { title: 'BEAN AROUND', bean });
  });
}

// Update bean entry form
function update(req, res) {
  Bean.findById(req.params.id, function(err, bean) {
    if(!bean.userId.equals(req.user._id)) return res.redirect('/beans');
    // Update body of the form
    bean.roaster = req.body.roaster;
    bean.blendName = req.body.blendName;
    bean.region = req.body.region;
    bean.description = req.body.description;
    bean.roast = req.body.roast;
    bean.fairTrade = !!req.body.fairTrade;
    bean.usdaOrganic = !!req.body.usdaOrganic;
    bean.utzCertified = !!req.body.utzCertified;
    bean.rainforestAlliance = !!req.body.rainforestAlliance;
    bean.smithsonianBF = !!req.body.smithsonianBF;

    bean.save(function(err) {
      if (err) return res.render('beans/edit', { title: 'BEAN AROUND', bean });
      // redirect back to bean's show view to ensure updates made
      res.redirect(`/beans/${bean._id}`);
    })
  })
}
