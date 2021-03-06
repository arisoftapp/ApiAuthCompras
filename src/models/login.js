var dbAdmin = require('../dbAdmin');

let userModel = {};

userModel.getValidarUsuario = (usuario, callback) => {
    if (dbAdmin) {
        dbAdmin.query(`SELECT 
            b.nombre_empresa AS 'empresa',
            b.id_empresa as 'id_empresa',
            b.dominio AS 'dominio',
            a.username AS 'usuario',
            a.password AS 'contra',
            a.id_almacen AS 'id_almacen',
            a.folio_oc as 'folio_oc'
        FROM 
            usuarios AS a
            INNER JOIN
            empresas AS b ON a.id_empresa=b.id_empresa   
        WHERE username='` + usuario + `' `, (err, rows) => {
            if (err) {
                throw err;
                callback(err,null);
            } else {
                callback(null, rows);
            }
        });
    }


};



module.exports = userModel;