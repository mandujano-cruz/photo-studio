const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  full_name: {
    type: String,
    required: true,
    minlenght: 2,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: 'El formato del correo no es válido',
    },
  },
  password: {
    type: String,
    required: true,
    minlenght: 6,
  },
  role: {
    type: String,
    required: true,
    minlenght: 2,
    maxlength: 15,
  },
  supersaasId: {
    type: Number,
    required: false,
    unique: true,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if(!user) return Promise.reject(new Error ('Contraseña o correo electrónico incorrecto'));
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if(!matched) return Promise.reject(new Error ('Contraseña o correo electrónico incorrecto'));
          return user;
        })
    });
}

module.exports = mongoose.model('user', userSchema);