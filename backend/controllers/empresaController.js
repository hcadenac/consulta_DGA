const db = require('../models');
const Empresa = db.Empresa; // <- Aquí accedes al modelo correctamente
//const Empresa = require('../models/empresa');
//const Municipio = require('../models/municipio');
const Municipio = db.Municipio; // o db.Municipio, según el nombre que uses

const getEmpresas = async (req, res) => {
  try {
    const empresas = await Empresa.findAll({ include: [{ model: Municipio, as: 'municipio' }] });
    res.json(empresas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//buscar empresa por id
const getEmpresaById = async (req, res) => {
    try {
      const empresa = await Empresa.findByPk(req.params.nit);
      if (!empresa) {
        return res.status(404).json({ error: 'Empresa no encontrada' });
      }
      res.json(empresa);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  //Crear Empresa
  const createEmpresa = async (req, res) => {
    try {
      const empresa = await Empresa.create(req.body);
      res.status(201).json(empresa);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  //Actualizar empresa
  const updateEmpresa = async (req, res) => {
    try {
      const empresa = await Empresa.findByPk(req.params.nit);
      if (!empresa) {
        return res.status(404).json({ error: 'Empresa no encontrada' });
      }
      await empresa.update(req.body);
      res.json(empresa);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  //Eliminar empresa
  const deleteEmpresa = async (req, res) => {
    try {
      const empresa = await Empresa.findByPk(req.params.nit);
      if (!empresa) {
        return res.status(404).json({ error: 'Empresa no encontrada' });
      }
      await empresa.destroy();
      res.json({ message: 'Empresa eliminada' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  module.exports = {
    getEmpresas,
    getEmpresaById,
    createEmpresa,
    updateEmpresa,
    deleteEmpresa
  };
