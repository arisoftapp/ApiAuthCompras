const detalles = require('../models/detalles');
module.exports = function (app, rutasprotegidas) {
    app.post('/getDetalles',rutasprotegidas, (req, res) => {
        detalles.getDetalles(req.body, (err, data) => {
            if (err) {
                res.status(500).send({
                    success: false,
                    mensaje: 'Error al consultar detalle:' + err
                });
                process.exit(0);
            } else {
                if (data.length < 1) {
                    res.json({
                        success: false,
                        mensaje: "No encontro detalle"
                    });
                } else {
                    detalles.getDetallesPartidas(req.body,(err2,data2)=>{
                        if (err2) {
                            res.status(500).send({
                                success: false,
                                mensaje: 'Error al consultar detalle de partidas:' + err
                            });
                            process.exit(0);
                        }else{
                            if(data2.length<1)
                            {
                                res.json({
                                    success: false,
                                    mensaje: "No encontro detalles de partida"
                                });
                            }else{
                                res.json({
                                    success: true,
                                    mensaje: "¡Consulta con exito!",
                                    detalles: data,
                                    partidas: data2
                                });

                            }
                            
                        }
                    })
                   
                }



            }
        });
    });
}