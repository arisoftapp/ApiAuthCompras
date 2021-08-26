var dbAdmin = require('../conexion_db');

let AltaUsuario =  {};

AltaUsuario.guardar = (data,contador, callback) => {
    var sql = "INSERT INTO usuarios (codigo, nombre, clave, idemp_selc  ) VALUES ('"+data.codigo+"', '"+data.nombre+"', '"+data.clave+"', "+contador+" )";
    dbAdmin.query(sql, function (err, result) {
        if (err) {
            callback(err, null);
            //throw err;
        } else {
            console.log("1 record inserted " + result);
            callback(null, result);
        }

    });
};
AltaUsuario.getIdEmp=(callback)=>{
    var sql = "SELECT idemp_selc FROM usuarios";
    var Array= []
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
            var contador=1;
            while(bandera==false || index<Array.length)
            {
                //console.log(Array[index])
               // console.log("contador"+contador)
                if(contador!=Array[index])
                {
                    console.log("cambiar bandera")
                    bandera=true;
                }
                else
                {
                    contador++;
                }
                
                index++;
            }
            callback(null, contador);
        
        }

    });


}

AltaUsuario.editar =  (data, callback) =>{
    var sql = "UPDATE usuarios SET nombre='"+data.nombre+" ',  clave=' "+data.clave+"' WHERE codigo='"+data.codigo+"' ";
    dbAdmin.query(sql, function (err, result) {
        if (err) {
            callback(err, null);
        } else {
            console.log("1 record update " + result);
            callback(null, result);
        }
    })
};


AltaUsuario.eliminar = (id, callback) => {
    var sql = "DELETE FROM usuarios WHERE idusuarios="+id+" ";
    dbAdmin.query(sql, function (err, result) {
        if (err) {
            callback(err, null);
        } else {
            console.log("1 record delete " + result);
            callback(null, result);
        }
    })
}





module.exports = AltaUsuario;