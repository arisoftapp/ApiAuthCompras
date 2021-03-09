let dbCOBOL003 = require('../conexiones/emp03');
let dbCOBOL007 = require('../conexiones/emp07');
let dbCOBOL = {};

let previos = {};
previos.getPrevios = async function (empresa, callback) {

    switch (empresa) {
        case 003:
            dbCOBOL = dbCOBOL003;
            break;
        case 007:
            dbCOBOL = dbCOBOL007;
            break;
        default:
            break;
    }

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
        dbCOBOL.base.query(`
                 SELECT 
                 PUBLIC.COMDOC.CDOC_FOL, 
                 PUBLIC.COMDOC.CDOC_FCH, 
                 PUBLIC.COMDOC.CDOC_ALM, 
                 PUBLIC.COMDOC.CDOC_TOTAL
                FROM PUBLIC.COMDOC
                WHERE (((PUBLIC_COMDOC.CDOC_OPE)=1) 
                AND ((PUBLIC_COMDOC.CDOC_STAT2)="D"));
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