const previos = require('../models/previos');

app.get('/getPrevios/:emp', (req, res) => {
    previos.getPrevios(req.params.emp, (err, data) => {
        if (err) {
            res.status(500).send({
                success: false,
                mensaje: 'Error al consultar previos:' + err
            });
            process.exit(0);
        } else {
            if (data.length < 1) {
                res.json({
                    success: false,
                    mensaje: "No encontro previos"
                });
            } else {
                res.json({
                    success: true,
                    mensaje: "¡Consulta con exito!",
                    previos: data,
                });
            }



        }
    });
});