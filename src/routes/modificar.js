const modificar = require('../models/modificar');
module.exports = function (app, rutasprotegidas) {
    app.put('/setStatus', (req, res) => {
        modificar.setStatus(req.body, (err, data) => {
            if (err) {
                res.status(500).send({
                    success: false,
                    mensaje: 'Error al cambiar status:' + err
                });
                process.exit(0);
            } else {
                    res.json({
                        success: true,
                        mensaje: "¡Modificacion con exito!",
                        respuesta: data,
                    });
            }
        });
    });
}