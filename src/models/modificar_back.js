let dbCOBOL = require('../dbMacro');
let backModel = {};

backModel.getBack = async function (reqData,callback) {
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
        EXI_ORD AS 'backorder'
        FROM
        PUBLIC.INVEXI
        WHERE
        EXI_ALM='` + reqData.almacen + `'
        AND
        EXI_ART='` + reqData.articulo + `'
    `, function(err, rows) {
            if (err) {
                //throw err;
                callback(err, null);
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
backModel.modificar_backorder_json = async function (almacen,articulos, callback) {
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
    //console.log(articulos.length);
        for (var item of articulos){
           pause(1);
           const sql = `UPDATE PUBLIC.INVEXI 
           SET 
           EXI_ORD = '` + item.cantidad + `'
           WHERE 
           EXI_ALM = '` + almacen + `'
           AND EXI_ART='` + item.articulo + `'
       
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
                                    console.log("error en:"+ err);
                                    //callback(err, null);
                                    //throw err;
                                }
                            } else {
                               respuesta=rows;
                               //console.log(rows);
                               //console.log("se inserto articulo:"+item.articulo+" "+item.posicion);
                               if(count==1)
                               {
                                console.log(rows);
                                //callback(null, respuesta);
                               
                               }
                            }
                            count++;
                        });
                    }
                    else{
                        callback("intentar de nuevo",null);
                    }

            
        };
    callback(null, respuesta);
};
backModel.modificarBack = async function(reqData,cantidad,callback) {
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
        const sql = `UPDATE PUBLIC.INVEXI 
        SET 
        EXI_ORD = '` + cantidad + `'
        WHERE 
        EXI_ALM = '` + reqData.almacen + `'
        AND EXI_ART='` + reqData.articulo + `'
    
        `;
        dbCOBOL.base.queryResult(sql, function(err, rows) {
            if (err) {
                //throw err;
                callback(err, null);
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


module.exports = backModel;