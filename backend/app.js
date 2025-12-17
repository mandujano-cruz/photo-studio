const mongoose = require('mongoose');
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const usersRouter = require('./routes/users');
const { appointmentsPublicRouter, appointmentsPrivateRouter } = require("./routes/appointments");
const auth = require('./middleware/auth');
const { login } = require('./controllers/users');
const seedAdminUser = require('./utils/seed');

const app = express();
const { NODE_ENV, JWT_SECRET, PORT=3000, MONGO_URI } = process.env;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Conexión exitosa');
    seedAdminUser();
  })
  .catch((err) => console.error('Conexión erronea: ', err));

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Servidor funcionando');
});

app.post('/login', login);
app.use('/public/appointments', appointmentsPublicRouter);

app.use('/', auth);

app.use('/users', usersRouter);
app.use("/appointments", appointmentsPrivateRouter);

app.use((req, res) => {
  res.status(404).send({message: "Recurso solicitado no encontrado"})
});

app.listen(PORT, '127.0.0.1', () => {
  console.log(`Servidor corriendo en http://127.0.0.1:${PORT}`);
});
