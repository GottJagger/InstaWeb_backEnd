const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const photoSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  url: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});
 
module.exports = mongoose.model('Photo', photoSchema);
