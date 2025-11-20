//const { Seguimiento, Empresa, Funcionario } = require('../models');
const db = require('../models');
const Seguimiento = db.Seguimiento;
const Empresa = db.Empresa;
const Funcionario = db.Funcionario;
//const Seguimiento = require('../models/seguimiento');

// Obtener todos los seguimientos
const getAllSeguimientos = async (req, res) => {
  try {
    const seguimientos = await Seguimiento.findAll({
      include: [
        { model: Empresa, as: 'empresa' },
        { model: Funcionario, as: 'funcionario' }
      ]
    });
    res.json(seguimientos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener seguimiento por ID
const getSeguimientoById = async (req, res) => {
  const { id } = req.params;
  try {
    const seguimiento = await Seguimiento.findByPk(id, {
      include: [
        { model: Empresa, as: 'empresa' },
        { model: Funcionario, as: 'funcionario' }
      ]
    });
    if (!seguimiento) {
      return res.status(404).json({ error: 'Seguimiento no encontrado' });
    }
    res.json(seguimiento);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear nuevo seguimiento
const createSeguimiento = async (req, res) => {
  const { departamento_id, funcionario_id, fecha_seguimiento, resultado_visita,observaciones } = req.body;
  try {
    const nuevo = await Seguimiento.create({ departamento_id, funcionario_id, fecha_seguimiento, resultado_visita,observaciones });
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar seguimiento
const updateSeguimiento = async (req, res) => {
  const { id } = req.params;
  const { departamento_id, funcionario_id, fecha_seguimiento, resultado_visita,observaciones } = req.body;
  try {
    const seguimiento = await Seguimiento.findByPk(id);
    if (!seguimiento) {
      return res.status(404).json({ error: 'Seguimiento no encontrado' });
    }
    await seguimiento.update({ departamento_id, funcionario_id, fecha_seguimiento, resultado_visita,observaciones });
    res.json(seguimiento);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar seguimiento
const deleteSeguimiento = async (req, res) => {
  const { id } = req.params;
  try {
    const seguimiento = await Seguimiento.findByPk(id);
    if (!seguimiento) {
      return res.status(404).json({ error: 'Seguimiento no encontrado' });
    }
    await seguimiento.destroy();
    res.json({ message: 'Seguimiento eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllSeguimientos,
  getSeguimientoById,
  createSeguimiento,
  updateSeguimiento,
  deleteSeguimiento
};
