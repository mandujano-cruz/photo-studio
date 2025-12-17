const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ClientInstance = require("../utils/supersaasClient");
const SALT = 10;

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.createUser = (req, res, next) => {
  const { email, password, full_name, role } = req.body;

  bcrypt.hash(password, SALT)
    .then((hash) => {
      // 1️⃣ Guardar en MongoDB
      return User.create({
        email,
        password: hash,
        full_name,
        role,
      });
    })
    .then((user) => {
      //const externalUserId = user._id.toString();
      // 2️⃣ Crear en SuperSaaS
      const supersaasData = {
        full_name: full_name,
        name: email,
        password: password,
        role: role === 'admin' ? 4 : 3,
      };

      return ClientInstance.users.create(supersaasData)
        .then((supersaasUser) => {
          const tempUrl = supersaasUser.replace('.json', '');
          const parts = tempUrl.split('/');
          const supersaasIdString = parts[parts.length - 1];
          const supersaasIdNumber = parseInt(supersaasIdString, 10);
          return User.findByIdAndUpdate(
            user._id,
            { $set: { supersaasId: supersaasIdNumber } },
            { new: true }
          );
        }); 
    })
    .then((user) => res.status(201).send({
      _id: user._id,
      email: user.email,
      full_name: user.full_name,
      role: user.role,
      supersaasId: user.supersaasId,
    }))
    .catch((err) => {
      if(err.code === 11000) {
        return res.status(409).send({message: 'El correo electrónico ya está registrado'})
      }
      return next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      console.log('ID de SuperSaaS recuperado de la BD:', user.supersaasId);
      const token = jwt.sign(
        {
          _id: user._id,
          supersaasId: user.supersaasId,
        },
        NODE_ENV === 'production' ? JWT_SECRET : 'clave-secreta',
        { expiresIn: '1d' },
      );
      res.send({ 
        token,
        user: {
          _id: user._id,
          email: user.email,
          full_name: user.full_name,
          role: user.role,
        } 
      });
    })
    .catch((err) => next(err));
};


/**
 * Obtener todos los usuarios locales
 * Opcional: se puede sincronizar con SuperSaaS usando supersaasId
 */
module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then(users => res.status(200).send(users))
    .catch(next);
};

/**
 * Obtener el usuario actual
 */
module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      const error = new Error('ID de usuario no encontrado');
      error.statusCode = 404;
      throw error;
    })
    .then(user => res.status(200).send(user))
    .catch(next);
};

module.exports.updateProfile = (req, res, next) => {
  const userId = req.user._id;
  const { name } = req.body;

  if (!name) return res.status(400).send({message: 'Se requiere name'});

  const userData = {
    full_name: name,
  }

  User.findByIdAndUpdate(
    userId,
    userData,
    {new: true}
  )
    .then((user) => {
      if (!user) return res.status(404).send({message: 'Usuario no encontrado'});

      const supersaasId = user.supersaasId;

      ClientInstance.users.update(supersaasId, userData)
        .then((data) => console.log(data))

      return res.send({
        _id: user._id,
        email: user.email,
        full_name: user.full_name,
        role: user.role,
      })
    })
}