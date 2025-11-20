const express = require('express');
const router = express.Router();
const { getAllUsuarios, getUsuarioById, createUsuario, updateUsuario, deleteUsuario, login, register }= require('../controllers/usuarioController');

const verificarToken = require('../middlewares/authMiddleware');

// Ruta pública
router.post('/register', register);
router.post('/login', login);

router.get('/', getAllUsuarios);
router.get('/:id', getUsuarioById);
router.post('/', createUsuario);
router.put('/:id', updateUsuario);
router.delete('/:id', deleteUsuario);

module.exports = router;
