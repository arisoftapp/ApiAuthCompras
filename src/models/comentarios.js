var dateFormat = require('dateformat');
function pause(milisegundos){
    var dt=new Date();
    while((new Date())-dt<=milisegundos){}
}

let dbCOBOL21 = require('../conexiones/emp21');


let dbCOBOL = {};

let comentarios = {};
comentarios.insertComnetarios = async function (empresa,folio,comentarios,callback) {
 
    switch (empresa) {
       
        case '021':
            //let dbCOBOL21 = require('../conexiones/emp21');
            dbCOBOL = dbCOBOL21;
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
    let respuesta;
    if (result == true) {
        for (var item of comentarios){
            pause(1);
             var sql = `INSERT INTO PUBLIC.COMREN (
     CREN_OPE,CREN_FOL,CREN_POS,CREN_TIPO,CREN_FCH,CREN_MOV,CREN_FCH_MOD,CREN_FACTOR,CREN_CANT,CREN_OPEN,CREN_ART,CREN_CLF,
     CREN_PRO,CREN_COS,CREN_TCAM,CREN_DSC1,CREN_DSC2,CREN_DSC3,CREN_DSC4,CREN_DSC5,CREN_CAR1US,CREN_CAR2US,CREN_CAR3US,
     CREN_DSC_GLO,CREN_ARAN,CREN_EXE,CREN_IMP1,CREN_IMP2,CREN_ESTATAL,CREN_CAR1,CREN_CAR2,CREN_CAR3,CREN_CAR4,CREN_CAR5,
     CREN_CAR6,CREN_CLI,CREN_OBRA,CREN_OBR_CON,CREN_ADIC,CREN_DSC_NOCR,CREN_FOL_NOCR,CREN_CANT_NOCR,CREN_SURT,CREN_DEV,
     CREN_BACK,CREN_CANT2,CREN_FCH_ENV,CREN_FCH_REC,CREN_FCH_URE,CREN_FCH2,CREN_AUX,CREN_POS_AUX,CREN_MAS,CREN_IMP1_TAB,
     CREN_IMP2_TAB,CREN_CLIENTE,CREN_CONCEPTO,CREN_STAT,CREN_MAS_COMENT,CREN_COMENT,CREN_CANT_AUX,CREN_FCH_CADUCIDAD,
     CREN_FOL_PED_ESP,CREN_PRC_MAX,CREN_POS_REM,CREN_RP_CANT_SURT,CREN_RP_POS_REM,CREN_FCH_MODIF,CREN_GRAV_EXE,CREN_TOT_COS_CAR,
     CREN_CONTRATO,CREN_TAR,CREN_TAR_IMP,CREN_AGRUP
                 ) VALUES (
                     '1',
                     '` + folio + `',
                     '` + item.posicion + `',
                     '1',
                     '` + item.fecha + `',
                     'C',
                     '',
                     '0',
                     '-1',
                     '2',
                     '',
                     '',
                     '',
                     '',
                     '',
                     '',
                     '',
                     '',
                     '',
                     '',
                     '',
                     '',
                     '',
                     '',
                     '',
                     '',
                     '',
                     '',
                     '',
                     '',
                     '',
                     '',
                     '',
                     '',
                     '',
                     '',
                     '',
                     '',
                     '',
                     '',
                     '',
                     '',
                     '',
                     '',
                     '',
                     '',
                     '',
                     '',
                     '',
                     '',
                     '',
                     '',
                     '',
                     '',
                     '',
                     '',
                     '',
                     '',
                     '',
                     '` + item.comentario + `',
                     '0',
                     '0',
                     '',
                     '0',
                     '0',
                     '0',
                     '0',
                     '` + item.fechaf + `',
                     '0',
                     '0',
                     '',
                     '0',
                     '0',
                     '0'
                 )`;
        
        dbCOBOL.base.queryResult(sql, function(err, rows) {
            if (err) {
                respuesta+=err;
                    console.log("error en:"+ err);
               
            } else {
               respuesta+=rows;
            }
           
        });
    }
    callback(null, respuesta);
      
    }
    else {
        callback("conexion cerrada, intentar de nuevo", null);
    }
};

module.exports = comentarios;