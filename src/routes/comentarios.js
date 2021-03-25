const comentarios = require('../models/comentarios');
module.exports = function (app, rutasprotegidas) {
    app.post('/insertarComentarios',rutasprotegidas, (req, res) => {
        comentarios.insertComnetarios(req.body.empresa,req.body.folio,req.body.comentarios, (err, data) => {
            if (err) {
                res.status(500).send({
                    success: false,
                    mensaje: 'Error al insertar comentarios:' + err
                });
                process.exit(0);
            } else {
                    res.json({
                        success: true,
                        mensaje: "Inserto con exito!",
                        comentarios: data,
                    });
                

            }
        });
    });
}