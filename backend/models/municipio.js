// models/municipio.js

module.exports = (sequelize, DataTypes) => {
  const Municipio = sequelize.define('Municipio', {
    codmpio: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'municipio',
    timestamps: false,
  });

  // Si luego necesitas relaciones con otros modelos
  Municipio.associate = (models) => {
    // Ejemplo (si hay relación): 
    Municipio.hasMany(models.Empresa, { foreignKey: 'municipio_id' });
  };

  return Municipio;
};

