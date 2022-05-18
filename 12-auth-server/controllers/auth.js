const { response } = require('express');
const { validationResult } = require('express-validator');


const crearUsuario = (req, res = response) => {

    const { email, nombre, password } = req.body;

    return res.json({
        ok: true,
        msg: 'Crear usuario /new'
    });

}

const loginUsuario = (req, res) => {

    const { email, password } = req.body;

    return res.json({
        ok: true,
        msg: 'Login de ususario /'
    });

}

const revalidarToken = (req, res) => {

    return res.json({
        ok: true,
        msg: 'Renew'
    });

}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}