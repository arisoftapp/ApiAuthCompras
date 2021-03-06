let dbCOBOL = require('../dbMacro');
let modificarModel = {};

modificarModel.updatePrevioComdoc = async function(folio,almacen,cantidad,estatus,callback) {
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
       
        if(estatus=='A')
        {
            const sql = `UPDATE PUBLIC.COMDOC 
            SET 
            CDOC_UDS_SURT = '` + cantidad + `'
            WHERE CDOC_FOL = '` + folio + `'
            AND CDOC_OPE=1
            AND CDOC_ALM='` + almacen + `'
            `;
            dbCOBOL.base.queryResult(sql, function(err, rows) {
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
            const sql = `UPDATE PUBLIC.COMDOC 
            SET 
            CDOC_UDS_SURT = '` + cantidad + `',
            CDOC_STAT='` + estatus + `'
            WHERE CDOC_FOL = '` + folio + `'
            AND CDOC_OPE=1
            AND CDOC_ALM='` + almacen + `'
            `;
            dbCOBOL.base.queryResult(sql, function(err, rows) {
                if (err) {
                    callback(err, null);
                    //throw err;
                    
                } else {
                    callback(null, rows);
                }
            });
        }


    }
    else
    {
        callback("intentar de nuevo",null);
    }
};
modificarModel.updatePrevioComren = async function (folio,cantidad,articulo,callback) {
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
        const sql = `UPDATE PUBLIC.COMREN 
        SET 
        CREN_SURT = '` + cantidad + `'
        WHERE CREN_FOL = '` + folio + `'
        AND CREN_ART='` + articulo + `'
        AND CREN_OPE=1
        `;
        dbCOBOL.base.queryResult(sql, function(err, rows) {
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
function pause(milisegundos){
    var dt=new Date();
    while((new Date())-dt<=milisegundos){}
}
modificarModel.modificar_previo_json = async function(folio_previo,articulos, callback)  {
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
    let respuesta;
    let total=articulos.length;
    let count=1;
        for (var item of articulos){
           pause(1);
           var sql = `UPDATE PUBLIC.COMREN 
           SET 
           CREN_SURT = '` + item.cantidad + `'
           WHERE CREN_FOL = '` + folio_previo + `'
           AND CREN_ART='` + item.articulo + `'
           AND CREN_OPE=1
           `;
                    if(result==true)
                    {
                        dbCOBOL.base.queryResult(sql, function(err, rows) {
   
                            if (err) {
                                //console.log("error en el articulo "+item.articulo+" "+item.posicion);
                                //callback(err, null);
                                respuesta=err;
                                //throw err;
                                if(count==1)
                                {
                                    
                                    //console.log("error en:"+ err);
                                    //callback(err, null);
                                    //throw err;
                                }
                            } else {
                               respuesta=rows;
                               //console.log(rows);
                               //console.log("se inserto articulo:"+item.articulo+" "+item.posicion);
                               if(count==1)
                               {
                                //console.log(rows);
                                //callback(null, respuesta);
                               
                               }
                            }
                            count++;
                        });
                    }
                    else
                    {
                        callback("intentar de nuevo",null);
                    }

            
        };
    callback(null, respuesta);
};


module.exports = modificarModel;