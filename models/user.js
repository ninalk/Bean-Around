const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create User Model
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  avatar: String,
  googleId: String,
  beans: {
    type: Schema.Types.ObjectId,
    ref: 'Bean'
  }
}, {
  timestamps: true
});




module.exports = mongoose.model('User', userSchema);