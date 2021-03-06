let dbCOBOL = require('../dbMacro');
let almModel = {};

almModel.getAlmacenes = async function(callback) {
    let result;
    try {
        if(dbCOBOL.base.connected==false)
        {
            result = await dbCOBOL.conexion.abrir(); 
        }
        else
        {
            result=true;
        }
        
    } catch (error) {
        result=false;
        console.log(error);
    }
    if (result==true) {
        dbCOBOL.base.query(`SELECT 
        ALM_LLAVE AS 'idalmacen',
        ALM_NOMBRE AS 'almacen'
        FROM
        PUBLIC.INVALM
    `, function(err, rows) {
            if (err) {
                callback(err, null);
                //throw err;
                
            } else {
                callback(null, rows);
            }
        });
        
    }
    else
    {
        callback("conexion cerrada, intentar de nuevo",null);
    }
};



module.exports = almModel;