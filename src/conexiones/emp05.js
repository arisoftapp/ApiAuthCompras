var odbc = require("odbc");
var connectionString = "DSN=SELECTA05;UID=system;PWD=manager;DATABASE=EMP05";
var db = new odbc.Database();

let exp = {};
exp.abrir = async function () {
    return new Promise((resolve, reject) => {
        setTimeout(() => { resolve(false) }, 20000);
        db.open(connectionString, (err) => {
            if (err) {
                console.log('SERVIDOR MACROPRO NO RESPONDE - VERIFIQUE QUE ESTE ENCENDIDO');

                resolve(false);
            }
            else {
                resolve(true);
            }

        });
    });
}
exp.cerrar = async function () {
    let promise;
    try {
        promise = new Promise((resolve, reject) => {

            db.close(function () {
                console.log('Database Connection Closed');

                promise = true;
                process.exit(0);
            });
        });
    } catch (error) {
        console.log(error);
        promise = false;
    }

    return promise;


}
setTimeout(() => {
    if (db.connected == false) {
        console.log("open cerrada reiniciar EMP05");
        process.exit(0);
    }
    else {
        //console.log("open si se abrio")
    }
}, 10000)
setInterval(() => {
    console.log("reinicio cada hora");
    process.exit(0);

}, 3600000);
setInterval(() => {
    let ts = Date.now();
    let date_ob = new Date(ts);
    let date = date_ob.getDate();
    let month = date_ob.getMonth() + 1;
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();
    db.query(`SELECT 
	ALM_LLAVE AS 'idalmacen',
	ALM_NOMBRE AS 'almacen'
			 FROM
			 PUBLIC.INVALM`, function (err, rows) {
        if (err) {
            console.log("reinicio por desconexion:" + date + "/" + month + "/" + year + " - " + hours + ":" + minutes + ":" + seconds);
            process.exit(0);
        } else {
            //console.log("EMP03:");
            //console.log(rows);
            //console.log("conexion activa:" + date + "/" + month + "/" + year + " - " + hours + ":" + minutes + ":" + seconds);
        }
    });
}, 60000);

db.open(connectionString, function (err) {
    if (err) {
        console.log('SERVIDOR MACROPRO NO RESPONDE - VERIFIQUE QUE ESTE ENCENDIDO EMP05');
        process.exit(0);
    }
    else {
        let ts = Date.now();
        let date_ob = new Date(ts);
        let date = date_ob.getDate();
        let month = date_ob.getMonth() + 1;
        let year = date_ob.getFullYear();
        let hours = date_ob.getHours();
        let minutes = date_ob.getMinutes();
        let seconds = date_ob.getSeconds();

        //console.log("open abierta" + date + "/" + month + "/" + year + " - " + hours + ":" + minutes + ":" + seconds);

    }
});

//setTimeout(function() { console.log('Blah '+db.connected);db.close()}, 10000);
process.on('SIGINT', function () {
    db.close(function () {
        console.log('Database Connection Closed SINGINT');
        process.exit();
    });
});

module.exports = {
    conexion: exp,
    base: db
};