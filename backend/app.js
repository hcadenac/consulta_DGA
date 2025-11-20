const express = require('express');
const app = express();
const cors = require('cors');
const { sequelize } = require('./models/index');
const municipioRoutes = require('./routes/municipioRoutes');
const empresaRoutes = require('./routes/empresaRoutes');
const funcionarioRoutes = require('./routes/funcionarioRoutes');
const seguimientoRoutes = require('./routes/seguimientoRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');

app.use(express.json());
app.use(cors());

app.use('/municipios', municipioRoutes);
app.use('/empresas', empresaRoutes);
app.use('/funcionarios', funcionarioRoutes);
app.use('/seguimientos', seguimientoRoutes);
app.use('/usuarios', usuarioRoutes);

const PORT = 3000;

sequelize.authenticate()
  .then(() => {
    console.log('Conexión establecida con SQLite');
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('No se pudo conectar a la base de datos:', err);
  });
