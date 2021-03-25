
var dateFormat = require('dateformat');

let dbCOBOL21 = require('../conexiones/emp21');


let dbCOBOL = {};

let detalles = {};
detalles.getDetalles = async function (data,callback) {
 let empresa=data.empresa;
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
        let dia=data.fecha.substr(0,2);
        let mes=data.fecha.substr(2,2);
        let año=data.fecha.substr(4,4);
        let fch=dateFormat(mes+"-"+dia+"-"+año, "yyyy-mm-dd");
        //console.log(fch)
        dbCOBOL.base.query(`
        SELECT 
        PUBLIC.COMDOC.CDOC_FOL, 
        PUBLIC.COMDOC.CDOC_FCH, 
        PUBLIC.COMDOC.CDOC_ALM AS IDALMACEN, 
        PUBLIC.COMDOC.CDOC_PRO AS IDPROVEEDOR, 
        PUBLIC.COMDOC.CDOC_SUMA AS SUBTOTAL, 
        PUBLIC.COMDOC.CDOC_IVA AS IVA, 
        PUBLIC.COMDOC.CDOC_TOTAL AS TOTAL, 
        PUBLIC.COMPRO.PRO_NOMBRE AS ALMACEN, 
        PUBLIC.INVALM.ALM_NOMBRE AS ALMACEN
        FROM PUBLIC.COMDOC, PUBLIC.COMPRO, PUBLIC.INVALM
        WHERE (((PUBLIC.COMDOC.CDOC_OPE)=1) 
        AND ((PUBLIC.COMDOC.CDOC_FOL)='` + data.folio + `') 
        
        AND ((PUBLIC.COMPRO.PRO_LLAVE)=PUBLIC.COMDOC.CDOC_PRO) 
        AND ((PUBLIC.INVALM.ALM_LLAVE)=PUBLIC.COMDOC.CDOC_ALM))
                
                
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
detalles.getDetallesPartidas = async function (data,callback) {
    let empresa=data.empresa;
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
           let dia=data.fecha.substr(0,2);
           let mes=data.fecha.substr(2,2);
           let año=data.fecha.substr(4,4);
           let fch=dateFormat(mes+"-"+dia+"-"+año, "yyyy-mm-dd");
           //console.log(fch)
           dbCOBOL.base.query(`
           SELECT 
           PUBLIC.COMREN.CREN_FOL AS FOLIO, 
           PUBLIC.COMREN.CREN_POS AS POS, 
           PUBLIC.COMREN.CREN_ART AS COD_ART, 
           PUBLIC.COMREN.CREN_CANT AS CANT, 
           PUBLIC.COMREN.CREN_CLF AS COD_CLF, 
           PUBLIC.COMREN.CREN_COS AS COSTO, 
           PUBLIC.COMREN.CREN_CLI AS COD_CLI, 
           PUBLIC.COMREN.CREN_ADIC AS ADIC,
           PUBLIC.COMREN.CREN_COMENT AS COMENTARIO,
           PUBLIC.INVART.ART_DESC1 AS NOM_ART,
           PUBLIC.VENCLI.CLI_NOMBRE AS NOM_CLI
            FROM PUBLIC.COMREN
            LEFT JOIN PUBLIC.INVART ON PUBLIC.COMREN.CREN_ART=PUBLIC.INVART.ART_COD1
            LEFT JOIN PUBLIC.VENCLI ON PUBLIC.COMREN.CREN_CLI=PUBLIC.VENCLI.CLI_LLAVE 
            WHERE (((PUBLIC.COMREN.CREN_FOL)='` + data.folio + `') 
            AND ((PUBLIC.COMREN.CREN_OPE)=1))                    
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
module.exports = detalles;