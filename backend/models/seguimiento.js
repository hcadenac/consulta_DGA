// models/seguimiento.js

module.exports = (sequelize, DataTypes) => {
  const Seguimiento = sequelize.define('Seguimiento', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true // Suponiendo que el ID sea incremental
    },
    departamento_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    funcionario_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fecha_seguimiento: {
      type: DataTypes.TEXT
    },
    resultado_visita: {
      type: DataTypes.TEXT
    },
    observaciones: {
      type: DataTypes.TEXT
    }
  }, {
    tableName: 'seguimiento',
    timestamps: false
  });

  // Relaciones
  Seguimiento.associate = (models) => {
    Seguimiento.belongsTo(models.Empresa, {
      foreignKey: 'departamento_id',
      as: 'empresa'
    });

    Seguimiento.belongsTo(models.Funcionario, {
      foreignKey: 'funcionario_id',
      as: 'funcionario'
    });
  };

  

  return Seguimiento;
};

