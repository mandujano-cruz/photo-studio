const mongoose = require('mongoose');
const validator = require('validator');

const appointmentSchema = new mongoose.Schema({
  userId: {
    type: Number,
    required: true,
    minlength: 2,
    maxlength: 10,
  },
  full_name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 40,
  },
  name: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: 'El formato del correo no es válido',
    },
  },
  start: {
    type: Date,
    required: true,
  },
  finish: {
    type: Date,
    required: true
  },
});

module.exports = mongoose.model('appointment', appointmentSchema);