var dbAdmin = require('../conexion_db');
let empresasmodel = {};

empresasmodel.getEmpresas = (idempresa, callback) => {
    if (dbAdmin) {
        dbAdmin.query(`SELECT 
        empresas.codigo,empresas.nombre,empresas.puerto,emp_selc.idemp_selc 
        FROM emp_selc,empresas 
        WHERE emp_selc.idusuario ='` + idempresa + `'
        AND emp_selc.idempresa=empresas.idempresas
         `, (err, rows) => {
            if (err) {
                throw err;
            } else {
                callback(null, rows);
            }
        });
    }


};

empresasmodel.getAllEmpresas = ( callback) => {
    if (dbAdmin) {
        dbAdmin.query(`SELECT 
       *
        FROM empresas 

         `, (err, rows) => {
            if (err) {
                callback(err,null);
            } else {
                callback(null, rows);
            }
        });
    }


};

module.exports = empresasmodel;