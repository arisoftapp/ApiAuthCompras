const folios = require('../models/folios_orden');

module.exports = function(app) {

    app.get('/foliosOC/:folio/:almacen', (req, res) => {
        let folio=req.params.folio;
        let almacen=req.params.almacen;
        folios.getFolio(folio,almacen,(err, data) => {
            if (err) {
                res.status(500).send({
                    success: false,
                    message: 'Error al consultar folio:' + err
                });
                //throw err;
                process.exit(0);
            } else {
                if (data.length < 1) {
                    res.json({
                        success: true,
                        message: "folio disponible"
                    });
                } else {
                    res.json({
                        success: false,
                        message:"folio no disponible",
                        respuesta: data,
                    });
                }
            }

        });
    });



}