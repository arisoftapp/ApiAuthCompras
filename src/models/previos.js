
var dateFormat = require('dateformat');
/*
let dbCOBOL03 = require('../conexiones/emp03');

let dbCOBOL05 = require('../conexiones/emp05');

let dbCOBOL07 = require('../conexiones/emp07');

let dbCOBOL09 = require('../conexiones/emp09');

let dbCOBOL11 = require('../conexiones/emp11');

let dbCOBOL13 = require('../conexiones/emp13');

let dbCOBOL20 = require('../conexiones/emp20');
*/
let dbCOBOL21 = require('../conexiones/emp21');
/*
let dbCOBOL22 = require('../conexiones/emp22');

let dbCOBOL23 = require('../conexiones/emp23');

let dbCOBOL24 = require('../conexiones/emp24');
*/

let dbCOBOL = {};

let previos = {};
previos.getPrevios = async function (empresa,fecha, callback) {
 console.log(fecha);
    switch (empresa) {
        case '003':
            //let dbCOBOL03 = require('../conexiones/emp03');
            dbCOBOL = dbCOBOL03;
            break;
        case '005':
           // let dbCOBOL05 = require('../conexiones/emp05');
            dbCOBOL = dbCOBOL05;
            break;
        case '007':
           // let dbCOBOL07 = require('../conexiones/emp07');
            dbCOBOL = dbCOBOL07;
            break;
            
        case '009':
           // let dbCOBOL09 = require('../conexiones/emp09');
            dbCOBOL = dbCOBOL09;
            
            break;
        case '011':
            //let dbCOBOL11 = require('../conexiones/emp11');
            dbCOBOL = dbCOBOL11;
            break;
        case '013':
            //let dbCOBOL13 = require('../conexiones/emp13');
            dbCOBOL = dbCOBOL13;
            break;
        case '020':
            //let dbCOBOL20 = require('../conexiones/emp20');
            dbCOBOL = dbCOBOL20;
            break;
        case '021':
            //let dbCOBOL21 = require('../conexiones/emp21');
            dbCOBOL = dbCOBOL21;
            break;
        case '022':
            //let dbCOBOL22 = require('../conexiones/emp22');
            dbCOBOL = dbCOBOL22;
            break;
        case '023':
            //let dbCOBOL23 = require('../conexiones/emp23');
            dbCOBOL = dbCOBOL23;
            break;
        case '024':
            //let dbCOBOL24 = require('../conexiones/emp24');
            dbCOBOL = dbCOBOL24;
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
        let dia=fecha.substr(0,2);
        let mes=fecha.substr(2,2);
        let año=fecha.substr(4,4);
        let fch=dateFormat(mes+"-"+dia+"-"+año, "yyyy-mm-dd");
        //console.log(fch)
        dbCOBOL.base.query(`
                 SELECT 
                 PUBLIC.COMDOC.CDOC_FOL AS FOLIO, 
                 PUBLIC.COMDOC.CDOC_FCH AS FECHA, 
                 PUBLIC.COMDOC.CDOC_ALM AS ALMACEN, 
                 PUBLIC.COMDOC.CDOC_TOTAL AS TOTAL,
                 PUBLIC.COMDOC.CDOC_STAT2 AS ESTATUS
                FROM PUBLIC.COMDOC
                WHERE (((PUBLIC.COMDOC.CDOC_FCH)>='` + fch + `')
                AND ((PUBLIC.COMDOC.CDOC_OPE)=1)
              ) 
                
                 `, function (err, rows, moreResultSets) {
            if (err) {

                callback(err, null);

            }
            else {
                callback(null, rows);
                //dbCOBOL.conexion.cerrar();
            }
        });
    }
    else {

        callback("conexion cerrada, intentar de nuevo", null);
    }
};

module.exports = previos;