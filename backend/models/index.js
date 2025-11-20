const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '../database/data.sqlite3'),
  logging: false,
});

const db = {};

fs.readdirSync(__dirname)
  .filter(file =>
    file !== basename &&
    file.endsWith('.js')
  )
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    const modelName = model.name.charAt(0).toUpperCase() + model.name.slice(1);
    db[model.name] = model;
  });

// Ejecutar asociaciones
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
