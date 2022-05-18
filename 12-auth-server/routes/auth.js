const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();

// Crear un nuevo usuario
router.post( '/new', [
    check('nombre', ' El nombre es obligatorio ').not().isEmpty(),
    check('email', ' El email es obligatorio ').isEmail().isLength({ min: 6}),
    check('password', ' La contraseña es obligatorio ').isLength({ min: 6}),
    validarCampos
],crearUsuario );

// Login de usuario
router.post('/', [
    check('email', ' El email es obligatorio ').isEmail().isLength({ min: 6}),
    check('password', ' La contraseña es obligatorio ').isLength({ min: 6}),
    validarCampos
],loginUsuario );

// Validar y revalidar token
router.get('/renew', revalidarToken);


module.exports = router;