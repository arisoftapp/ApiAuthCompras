var dbAdmin = require('../conexion_db');

let AltaEmpresa =  {};


  AltaEmpresa.guardar  = (data, callback ) => {
    var sql = "INSERT INTO emp_selc (idusuario, idempresa) VALUES ( "+data.idusuario+", "+data.idempresa+")";
    dbAdmin.query(sql, function (err, result) {
        if (err) {
            callback(err, null);
            //throw err;
        } else {
            console.log("1 record inserted " + result);
            callback(null, result);
        }

    });
} 

AltaEmpresa.getIdEmp=(data,callback)=>{
    var sql = "SELECT idemp_selc FROM usuarios";
    var Array= [
        {
            "idusuario" : "+data.idusuario+",
            "idempresa" : "+data.idempresa+",
        }
    ]
    dbAdmin.query(sql, function (err, result) {
        if (err) {
            callback(err, null);
            //throw err;
        } else {
            //console.log(result);
            
            result.map((row)=>{
               // console.log(row);
                //console.log(row.idemp_selc);
                Array.push(row.idemp_selc);
            })
            var bandera=false;
            var index=0;
            var seleccionador=1;
            while(bandera==false || index<Array.length)
            {
                console.log(Array[index])
                console.log("seleccionador"+seleccionador)
                if(seleccionador!=Array[index])
                {
                    console.log("cambiar bandera")
                    bandera=true;
                }
                else
                {
                seleccionador++;
                }
                
                index++;
            }
            callback(null,seleccionador); 
        
        }

    });


} 






/*AltaEmpresa.guardar=(data, callback)=>{
  var statement = 'INSERT INTO emp_selc (idusuario,idempresa) VALUES (?,?)';
  var insertStatement = [emp_selc, values];
  var sql = db.connection.format(statement, insertStatement);
  dbAdmin.query(sql, function(err, result) {
    if (err) {
      return clb(err);
    }
    var rowIds = [];
    for (var i = result.insertidempresas; i < result.insertidempresas + result.affectedRows; i++) {
      rowIds.push(i);
    }
    for (var i in persistentObjects) {
      var persistentObject = persistentObjects[i];
      persistentObject[persistentObject.idAttributeName()] = rowIds[i];
    }
    clb(null, persistentObjects);
  });


}
*/

/*for(var i = 0;i<cantidad;i++){
                var vuelta = i+1;
                records.push([respuesta,vuelta+'/'+cantidad,req.query["id_usuario"],req.query["descripcion"],req.query["proveedor"]]);
            console.log(records)
            }

            var cons = 'insert into emp_selc (idusuarios,idempresa) values ?';
            var request2 = new sql.Request();
            console.log(req.query)
            request2.query(cons,[records] , function (err, rows) {
                if(!err){
                    res.send(rows['recordsets'][0]);
                    console.log(rows)
                } else{
                    res.send(err)
                }
            });  */

AltaEmpresa.eliminar = (id, callback) => {
    var sql = "DELETE FROM emp_selc WHERE idemp_selc="+id+" ";
    dbAdmin.query(sql, function (err, result) {
        if (err) {
            callback(err, null);
        } else {
            console.log("1 record delete " + result);
            callback(null, result);
        }
    })
}

module.exports = AltaEmpresa;