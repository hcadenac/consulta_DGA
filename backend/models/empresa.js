// models/empresa.js

module.exports = (sequelize, DataTypes) => {
  const Empresa = sequelize.define('Empresa', {
    nit: { type: DataTypes.STRING, primaryKey: true },
    razon_social: { type: DataTypes.STRING, allowNull: false },
    direccion: { type: DataTypes.STRING, allowNull: false },
    municipio_id: { type: DataTypes.STRING },
    codigo_ciiu: { type: DataTypes.TEXT },
    camara_comercio: { type: DataTypes.TEXT },
    latitud: { type: DataTypes.FLOAT, allowNull: false },
    longitud: { type: DataTypes.FLOAT, allowNull: false },
    pagina_web: { type: DataTypes.TEXT },
    email: { type: DataTypes.TEXT },
    telefono: { type: DataTypes.TEXT },
    nombre_representante_legal: { type: DataTypes.TEXT, allowNull: false },
    cedula_representante_legal: { type: DataTypes.TEXT, allowNull: false },
    sector_productivo: { type: DataTypes.TEXT, allowNull: false },
    tipo_departamento: { type: DataTypes.TEXT, allowNull: false },
    nombre_encargado: { type: DataTypes.TEXT, allowNull: false },
    profesion: { type: DataTypes.TEXT, allowNull: false },
    cargo: { type: DataTypes.TEXT, allowNull: false },
    email_encargado: { type: DataTypes.TEXT },
    fecha_creacion: { type: DataTypes.DATE }
  }, {
    tableName: 'empresa',
    timestamps: false
  });

  // Relaciones
  Empresa.associate = (models) => {
    Empresa.belongsTo(models.Municipio, {
      foreignKey: 'municipio_id',
      as: 'municipio'
    });
    Empresa.hasMany(models.Seguimiento, { foreignKey: 'departamento_id' });
  };

  return Empresa;
};

