const express = require('express');
const router = express.Router();
const { getEmpresas, getEmpresaById, createEmpresa, updateEmpresa, deleteEmpresa } = require('../controllers/empresaController');

router.get('/', getEmpresas);
router.get('/:nit', getEmpresaById);
router.post('/', createEmpresa);
router.put('/:nit', updateEmpresa);
router.delete('/:nit', deleteEmpresa);

module.exports = router;
