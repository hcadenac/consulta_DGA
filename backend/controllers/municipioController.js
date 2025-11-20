const db = require('../models');
const Municipio = db.Municipio; // <- Aquí accedes al modelo correctamente

// Obtener todos los municipios
const getAllMunicipios = async (req, res) => {
  try {
    //console.log(Municipio); // Debe mostrar la función del modelo
    //console.log(typeof Municipio.findAll);
    const municipios = await Municipio.findAll();
    res.json(municipios);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los municipios' });
    console.error('Error en getAllMunicipios:', error);
  }
};

// Obtener municipio por código
const getMunicipioById = async (req, res) => {
    try {
      const municipio = await Municipio.findByPk(req.params.codmpio);
      if (!municipio) {
        return res.status(404).json({ error: 'Municipio no encontrado' });
      }
      res.json(municipio);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Crear un nuevo municipio
  const createMunicipio = async (req, res) => {
    try {
      const { codmpio, nombre } = req.body;
      if (!codmpio || !nombre) {
        return res.status(400).json({ error: 'codmpio y nombre son obligatorios' });
      }
      const municipio = await Municipio.create({ codmpio, nombre });
      res.status(201).json(municipio);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Actualizar municipio
  const updateMunicipio = async (req, res) => {
    try {
      const municipio = await Municipio.findByPk(req.params.codmpio);
      if (!municipio) {
        return res.status(404).json({ error: 'Municipio no encontrado' });
      }
      await municipio.update(req.body);
      res.json(municipio);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Eliminar municipio
  const deleteMunicipio = async (req, res) => {
    try {
      const municipio = await Municipio.findByPk(req.params.codmpio);
      if (!municipio) {
        return res.status(404).json({ error: 'Municipio no encontrado' });
      }
      await municipio.destroy();
      res.json({ message: 'Municipio eliminado' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

module.exports = {
  getAllMunicipios,
  getMunicipioById,
  createMunicipio,
  updateMunicipio,
  deleteMunicipio
};
