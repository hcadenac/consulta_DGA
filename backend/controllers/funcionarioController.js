//const Funcionario = require('../models/funcionario');
const db = require('../models');
const Funcionario = db.Funcionario; // <- Aquí accedes al modelo correctamente

const getFuncionarios = async (req, res) => {
    try {
      const funcionarios = await Funcionario.findAll();
      res.json(funcionarios);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los funcionarios' });
    }
  };
  
  // Obtener funcionario por ID
const getFuncionarioById = async (req, res) => {
  try {
    const funcionario = await Funcionario.findByPk(req.params.id);
    if (!funcionario) {
      return res.status(404).json({ error: 'Funcionario no encontrado' });
    }
    res.json(funcionario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear funcionario
const createFuncionario = async (req, res) => {
  try {
    const funcionario = await Funcionario.create(req.body);
    res.status(201).json(funcionario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar funcionario
const updateFuncionario = async (req, res) => {
  try {
    const funcionario = await Funcionario.findByPk(req.params.id);
    if (!funcionario) {
      return res.status(404).json({ error: 'Funcionario no encontrado' });
    }
    await funcionario.update(req.body);
    res.json(funcionario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar funcionario
const deleteFuncionario = async (req, res) => {
  try {
    const funcionario = await Funcionario.findByPk(req.params.id);
    if (!funcionario) {
      return res.status(404).json({ error: 'Funcionario no encontrado' });
    }
    await funcionario.destroy();
    res.json({ message: 'Funcionario eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getFuncionarios,
  getFuncionarioById,
  createFuncionario,
  updateFuncionario,
  deleteFuncionario
};