const user = require('../models/administrador_empresas');
const jwt = require('jsonwebtoken');
module.exports = function (app, rutasprotegidas) {


    app.post('/altaempresaid', rutasprotegidas, (req, res) => {
        console.log(req.body)
        user.guardar(req.body,(err, data) => {
            if (err) {
                res.status(500).send({
                    success: false,
                    mensaje: 'Error al guardar idempresa:' + err
                });
            } else {
                res.json({
                    success: true,
                    respuesta: data,
                    mensaje: "Operación realizada con exito"

                })

            }
        });
    });

    app.get('/eliminarempresaid/:idusuario', rutasprotegidas, (req, res) => {
        user.eliminar(req.params.idusuario,(err, data) => {
            if (err) {
                 res.status(500).send({
                    success: false,
                    mensaje: 'Error al eliminar idempresa:' + err
                });
            } else {
                res.json({
                    success: true,
                    respuesta: data,
                    mensaje: "Operación realizada con exito"

                })

            }
        });
    });
}