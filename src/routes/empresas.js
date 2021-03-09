const previos = require('../models/empresas');
module.exports = function (app, rutasprotegidas) {
    app.get('/getEmpresas/:idemp', rutasprotegidas, (req, res) => {
        previos.getEmpresas(req.params.idemp, (err, data) => {
            if (err) {
                res.status(500).send({
                    success: false,
                    mensaje: 'Error al consultar empresas:' + err
                });
                process.exit(0);
            } else {
                if (data.length < 1) {
                    res.json({
                        success: false,
                        mensaje: "usuario sin empresas"
                    });
                } else {
                    res.json({
                        success: true,
                        mensaje: "¡Consulta con exito!",
                        empresas: data,
                    });
                }



            }
        });
    });
}