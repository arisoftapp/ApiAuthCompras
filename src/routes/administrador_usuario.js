const user = require('../models/administrador_usuario');
const jwt = require('jsonwebtoken');
module.exports = function (app, rutasprotegidas) {

    app.post('/altausuario', rutasprotegidas, (req, res) => {
        //console.log(req.body);
        user.getIdEmp((err2,data2)=>{
            if(err2){
                res.status(500).send({
                    success: false,
                    mensaje: 'Error al consultar id:' + err
                });
            }
            else{
        
                //console.log("insertar "+data2 );
                user.guardar(req.body,data2,(err, data) => {
                    if (err) {
                        res.status(500).send({
                            success: false,
                            mensaje: 'Error al guardar usuarios:' + err
                        });
                    } else {
                        res.json({
                            success: true,
                            respuesta: data,
                            idempresas:data2,
                            mensaje: "Operación realizada con exito"
        
                        })
        
                    }
                });
                
            }
        })
    
        
    });

    app.post('/modificarusuario', rutasprotegidas, (req, res) => {
       
        user.editar(req.body,(err, data) => {
            if (err) {
                res.status(500).send({
                    success: false,
                    mensaje: 'Error al editar usuario:' + err
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

    app.post('/eliminarusuarios/:id', rutasprotegidas, (req, res) => {
        user.eliminar(req.params.id,(err, data) => {
            if (err) {
                res.status(500).send({
                    success: false,
                    mensaje: 'Error al eliminar usuario:' + err
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