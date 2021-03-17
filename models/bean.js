const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create review model
const reviewSchema = new Schema({
  brewMethod: {
    type: String,
    enum: ['pour over', 'drip', 'frenchpress', 'aeropress', 'siphon', 'cold brew']
  },
  aroma: {type: Number, min: 1, max: 5},
  flavor: {type: Number, min: 1, max: 5},
  acidity: {type: Number, min: 1, max: 5},
  body: {type: Number, min: 1, max: 5},
  bitterness: {type: Number, min: 1, max: 5},
  overall: {type: Number, min: 1, max: 5},
  text: String,
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  date: Date
}, {
  timestamp: true
});

// create bean model
const beanSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  roaster: String,
  blendName: String,
  roast: {
    type: String,
    enum: ['light', 'medium', 'dark']
  },
  region: String,
  reviews: [reviewSchema],
  fairTrade: {type: Boolean, default: false},
  usdaOrganic: {type: Boolean, default: false},
  utzCertified: {type: Boolean, default: false},
  rainforestAlliance: {type: Boolean, default: false},
  smithsonianBF: {type: Boolean, default: false},
  description: String
}, {
  timestamps: true
});


module.exports = mongoose.model('Bean', beanSchema);