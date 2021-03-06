const user = require('../models/login');
module.exports = function(app) {

    app.get('/login/:usuario/:contra', (req, res) => {
        var usuario = req.params.usuario;
        var contra = req.params.contra;
        user.getValidarUsuario(usuario, (err, data) => {
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
                    if (data[0].contra != contra) {

                        res.json({
                            success: false,
                            mensaje: "contraseña incorrecta"
                        });
                    } else {
                        res.json({
                            success: true,
                            usuario: data,
                        });
                    }

                }

            }
        });
    });

}