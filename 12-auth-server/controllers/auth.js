const { response } = require('express');
const { validationResult } = require('express-validator');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const { db } = require('../models/Usuario');


const crearUsuario = async (req, res = response) => {

    const { email, nombre, password } = req.body;

    try {
         // Verificar el email
        const usuario = await Usuario.findOne({ email });

        if ( usuario ){
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ya existe con ese email'
            });
        }

        // Crear usuario con el modelo
        const dbUser = new Usuario( req.body );

        // Hash la contraseña
        const salt = bcrypt.genSaltSync(10);
        dbUser.password = bcrypt.hashSync( password, salt);

        // Generar el JWT
        const token = await generarJWT( dbUser.id, dbUser.nombre );


        // Crear el lusuario de DB
        await dbUser.save();

        // Generar respuesta exitosa
        return res.status(201).json({
            ok: true,
            uid: dbUser.id,
            nombre: dbUser.nombre,
            email: dbUser.email,
            token
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });  
    }

}

const loginUsuario = async (req, res) => {

    const { email, password } = req.body;


    try {
        
        const dbUser = await Usuario.findOne({ email });

        if( !dbUser){
            return res.status(400).json({
                ok: false,
                msg: 'El correo no existe'
            });
        }

        // Confirmar si el password hace match
        const validPassword = bcrypt.compareSync( password, dbUser.password );

        if( !validPassword ){
            return res.status(400).json({
                ok: false,
                msg: 'El password no es válido'
            });
        }

        // Generar el JWT
        const token = await generarJWT( dbUser.id, dbUser.nombre );

        // Respuesta del servicio
        return res.json({
            ok: true,
            uid: dbUser.id,
            name: dbUser.nombre,
            email: dbUser.email,
            token
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

const revalidarToken = async (req, res = response) => {

    const { uid } = req;

    //Leer la base de datos 
    const dbUser = await Usuario.findById(uid);



    // Generar el JWT
    const token = await generarJWT( uid, dbUser.nombre );

    return res.json({
        ok: true,
        uid,
        name: dbUser.nombre,
        email: dbUser.email,
        token
    });

}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}