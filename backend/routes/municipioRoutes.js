const express = require('express');
const router = express.Router();
const { getAllMunicipios, getMunicipioById, createMunicipio, updateMunicipio, deleteMunicipio } = require('../controllers/municipioController');

router.get('/', getAllMunicipios);
router.get('/:codmpio', getMunicipioById);
router.post('/', createMunicipio);
router.put('/:codmpio', updateMunicipio);
router.delete('/:codmpio', deleteMunicipio);

module.exports = router;
