const user = require('../models/login');
const jwt = require('jsonwebtoken');
module.exports = function (app, rutasprotegidas) {

    app.get('/usuarios', rutasprotegidas, (req, res) => {
        user.getValidarUsuario((err, data) => {
            if (err) {
                res.status(500).send({
                    success: false,
                    mensaje: 'Error al buscar usuarios:' + err
                });
            } else {
                res.json({
                    success: true,
                    respuesta: data,
                    mensaje: "consulta con exito"

                })

            }
        });
    });

    app.get('/usuario/:usu', (req, res) => {
        var usu = req.params.usu;
        user.getUsuario(usu, (err, data) => {
            if (err) {
                res.status(500).send({
                    success: false,
                    mensaje: 'Error al validar usuario:' + err
                });
            } else {
                if (data.length < 1) {
                    res.json({
                        success: false,
                        mensaje: "usuario incorrecto"
                    });
                } else {
                    res.json({
                        success: true,
                        respuesta: data,
                        mensaje: "consulta con exito"

                    })
                }
            }
        });
    });

    app.post('/login', (req, res) => {
        var usuario = req.body.usuario;
        var contra = req.body.contra;
        console.log(req.body);
        user.auth(usuario, (err, data) => {
            if (err) {
                res.status(500).send({
                    success: false,
                    message: 'Error al comprobar usuario:' + err
                });
            } else {
                if (data.length < 1) {
                    res.json({
                        success: false,
                        mensaje: "usuario incorrecto"
                    });
                } else {
                    if (data[0].clave != contra) {

                        res.json({
                            success: false,
                            mensaje: "contraseña incorrecta"
                        });
                    } else {
                        if (data[0].sesion == 1) {
                            res.json({
                                success: false,
                                mensaje: "usuario ya inicio sesion"
                            });
                        } else {
                            var ses = 0;
                            var usuaux = usuario.toUpperCase();
                            if (usuaux == "ADMIN") {
                                ses = 0;
                            }
                            else{
                                ses=0;
                            }
                            user.updateSesion(ses, usuario, (err, dataUpdate) => {
                                if (err) {
                                    res.status(500).send({
                                        success: false,
                                        message: 'Error al iniciar sesion:' + err
                                    });
                                } else {
                                    const payload = {
                                        check: true
                                    };
                                    const token = jwt.sign(payload, app.get('llave'), {

                                    });
                                    res.json({
                                        success: true,
                                        usuario: data[0].codigo,
                                        nom_usu:data[0].nombre,
                                        idempresas:data[0].idemp_selc,
                                        token: token,
                                        mensaje: "Bienvenido"
                                    });
                                }
                            })
                           
                            
                        }
                    }
                }
            }
        });
    });
    app.get('/logout/:usuario', (req, res) => {

        user.updateSesion(0, req.params.usuario, (err, dataUpdate) => {
            if (err) {
                res.status(500).send({
                    success: false,
                    message: 'Error al cerrar sesion:' + err
                });
            } else {

                res.json({
                    success: true,
                    info: dataUpdate,
                    mensaje: "Sesion Cerrada"
                });
            }
        })
    });

}