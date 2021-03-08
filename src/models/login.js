var dbAdmin = require('../conexion_db');

let userModel = {};

userModel.getValidarUsuario = (callback) => {
    if (dbAdmin) {
        dbAdmin.query(`
        SELECT *
        FROM 
        usuarios
         `, (err, rows) => {
            if (err) {
                callback(err, null);
                throw err;
            } else {
                callback(null, rows);
            }
        });
    }


};
userModel.auth = (usuario, callback) => {

    if (dbAdmin) {
        dbAdmin.query(`SELECT 
        *
        FROM 
            usuarios
        WHERE (usuarios.codigo='` + usuario + `' ) `, (err, rows) => {
            if (err) {
                throw err;
            } else {
                callback(null, rows);
            }
        });
    }


};
userModel.updateSesion = (sesion, usuario, callback) => {
    //console.log(sesion+" "+usuario);
    var sql = "UPDATE usuarios SET sesion=" + sesion + " WHERE codigo='" + usuario + "'";
    //console.log(sql);
    dbAdmin.query(sql, function (err, result) {
        if (err) {
            callback(err, null);
            //throw err;
        } else {

            console.log("1 record update " + result);
            callback(null, result);
        }

    });
};


userModel.getUsuario = (usuario, callback) => {
    if (dbAdmin) {
        dbAdmin.query(`SELECT 
        *
        FROM 
            usuarios
        WHERE codigo='` + usuario + `' `, (err, rows) => {
            if (err) {
                throw err;
            } else {
                callback(null, rows);
            }
        });
    }


};


module.exports = userModel;