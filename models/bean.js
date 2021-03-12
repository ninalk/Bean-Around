const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create review model
const reviewSchema = new Schema({
  brewMethod: {
    type: String,
    enum: ['pour over', 'drip', 'frenchpress', 'aeropress', 'siphon', 'cold brew']
  },
  aroma: {
    type: Number,
    min: 1,
    max: 10
  },
  flavor: {
    type: Number,
    min: 1,
    max: 10
  },
  acidity: {
    type: Number,
    min: 1,
    max: 10
  },
  body: {
    type: Number,
    min: 1,
    max: 10
  },
  bitterness: {
    type: Number,
    min: 1,
    max: 10
  },
  overall: {
    type: Number,
    min: 1,
    max: 10
  },
  text: String,
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
  certifications: {
    type: String,
    enum: ['Fair Trade', 'USDA Organic', ' UTZ Certified', 'Rainforest Alliance', 'Smithsonian Bird Friendly']
  }
}, {
  timestamps: true
});



module.exports = mongoose.model('Bean', beanSchema);