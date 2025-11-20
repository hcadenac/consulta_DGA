const express = require('express');
const router = express.Router();
const { getAllSeguimientos, getSeguimientoById, createSeguimiento, updateSeguimiento, deleteSeguimiento } = require('../controllers/seguimientoController');

router.get('/', getAllSeguimientos);
router.get('/:id', getSeguimientoById);
router.post('/', createSeguimiento);
router.put('/:id', updateSeguimiento);
router.delete('/:id', deleteSeguimiento);

module.exports = router;
