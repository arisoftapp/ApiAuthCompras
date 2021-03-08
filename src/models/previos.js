let dbCOBOL003 = require('../conexiones/emp03');
let dbCOBOL = {};

let previos = {};
previos.getPrevios = async function (empresa, callback) {
    /*
    switch (empresa) {
        case 003:
            dbCOBOL = dbCOBOL003;
            break;

        default:
            break;
    }
    */
    let result;
    try {
        if (dbCOBOL.base.connected == false) {
            result = await dbCOBOL.conexion.abrir();
        }
        else {
            result = true;
        }

    } catch (error) {
        result = false;
        console.log(error);
    }
    if (result == true) {
        dbCOBOL.base.query(`SELECT 
            ART_COD1 as 'codigo',
            ART_DESC1 AS 'descripcion',
            ART_SER AS 'serie',
            EXI_ACT as 'existenciaActual'
                    FROM
                    PUBLIC.INVEXI, 
                    PUBLIC.INVART
                 WHERE 
                 (((PUBLIC.INVART.ART_COD` + v + `)= '` + codigoProducto + `')
                 AND ((PUBLIC.INVEXI.EXI_ART)=ART_COD1)
                 AND ((PUBLIC.INVEXI.EXI_ALM)='`+ idalmacen + `')
                 )
                 `, function (err, rows, moreResultSets) {
            if (err) {

                callback(err, null);

            }
            else {
                callback(null, rows);
            }
        });
    }
    else {

        callback("conexion cerrada, intentar de nuevo", null);
    }
};

module.exports = previos;