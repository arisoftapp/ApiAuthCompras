let dbCOBOL = require('../dbMacro');
let folioModel = {};

folioModel.getFolio = async function(folio,almacen,callback)  {
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
        CDOC_FOL AS 'folio'
        FROM
        PUBLIC.COMDOC
        WHERE
        PUBLIC.COMDOC.CDOC_OPE=2
        AND PUBLIC.COMDOC.CDOC_FOL='`+folio+`' 
        AND PUBLIC.COMDOC.CDOC_ALM='`+almacen+`'

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
        callback("intentar de nuevo",null);
    }
};



module.exports = folioModel;