const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 15,
  },
  section: [{
    type: String,
    required: true,
    minlength: 2,
    maxlength: 15,
  }],
  image: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('photo', photoSchema);