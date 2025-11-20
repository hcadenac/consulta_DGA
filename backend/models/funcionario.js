// models/funcionario.js

module.exports = (sequelize, DataTypes) => {
  const Funcionario = sequelize.define('Funcionario', {
    cedula: {
      type: DataTypes.STRING, // Usar STRING es más estándar para identificadores tipo cédula
      primaryKey: true,
      allowNull: false
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cargo: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'funcionario',
    timestamps: false
  });

  // Relaciones si aplica en el futuro
  Funcionario.associate = (models) => {
    // Ejemplo si luego relacionas con seguimiento, empresa, etc.
    Funcionario.hasMany(models.Seguimiento, { foreignKey: 'funcionario_id' });
  };

  return Funcionario;
};

