let dbCOBOL = require('../dbMacro');
let consurModel = {};
//consulta cren, cdoc, invart, se envian folio, fecha, almacen
consurModel.getPrevioCompra = async function(codigo, fecha, almacen, callback) {
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
    //carga el previo de compra de macro a app todas las partidas
    if (result==true) {
        dbCOBOL.base.query(`SELECT 
        CREN_ART as 'articulo',
        CREN_CANT as 'cantidad',
        CREN_SURT as 'surtido',
        CREN_POS as 'posicion',
        ART_DESC1 as 'descripcion',
        ART_COD2 as 'codigo2',
        CDOC_ALM as 'almacen',
        CREN_COS as 'costo',
        CREN_IMP1 as 'iva',
        CREN_DSC1 as 'descuento1',
        CREN_DSC2 as 'descuento2',
        CREN_DSC3 as 'descuento3',
        CREN_DSC4 as 'descuento4',
        CREN_DSC5 as 'descuento5',
        CREN_TCAM as 'tipocambio',
        CREN_PRO as 'proveedor',
        CREN_FACTOR as 'factor',
        CREN_CLF AS 'clasificacion',
        CREN_IMP1 AS 'imp1',
        CREN_IMP2 AS 'imp2',
        CREN_IMP1_TAB AS 'imp1_tab',
        CREN_IMP2_TAB AS 'imp2_tab',
        EXI_ORD as 'cantbackorder'

        FROM PUBLIC.COMREN, PUBLIC.INVART,PUBLIC.COMDOC,PUBLIC.INVEXI
        WHERE PUBLIC.COMREN.CREN_OPE=1
        AND PUBLIC.COMREN.CREN_FOL='` + codigo + `'
        AND PUBLIC.COMREN.CREN_FCH='` + fecha + `'
        AND PUBLIC.COMDOC.CDOC_ALM='` + almacen + `'
        AND PUBLIC.INVART.ART_COD1=PUBLIC.COMREN.CREN_ART
        AND PUBLIC.COMDOC.CDOC_OPE=1
        AND PUBLIC.COMDOC.CDOC_FCH='` + fecha + `'
        AND PUBLIC.COMDOC.CDOC_FOL=PUBLIC.COMREN.CREN_FOL
        AND PUBLIC.INVEXI.EXI_ALM='` + almacen + `'
        AND PUBLIC.INVEXI.EXI_ART=PUBLIC.COMREN.CREN_ART
    
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
consurModel.getEstatus = async function(codigo, almacen, callback) {
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
        CDOC_STAT as ESTATUS,
        CDOC_FCH as 'fecha'
        FROM PUBLIC.COMDOC
        WHERE PUBLIC.COMDOC.CDOC_OPE=1
        AND PUBLIC.COMDOC.CDOC_FOL='` + codigo + `'
        AND PUBLIC.COMDOC.CDOC_ALM='` + almacen + `'
    
    `, function(err, rows) {
            if (err) {
                //throw err;
                callback(err, null);
            } else {
                callback(null, rows);
            }
        });
    }
    else{
        callback("intentar de nuevo",null);
    }
};
//encabezado del documento
consurModel.getComplementos = async function(folio, almacen, callback) {
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
        CDOC_FOL as 'folio',
        CDOC_FCH as 'fecha',
        CDOC_ALM as 'almacen',
        CDOC_UDS as 'unidades_a_surtir',
        CDOC_PRO as'codigo_prov',
        PRO_NOMBRE as 'nom_prov'
        FROM PUBLIC.COMDOC,PUBLIC.COMPRO
        WHERE PUBLIC.COMDOC.CDOC_OPE=1
        AND PUBLIC.COMDOC.CDOC_FOL='` + folio + `'
        AND PUBLIC.COMDOC.CDOC_ALM='` + almacen + `'
        AND PUBLIC.COMPRO.PRO_LLAVE=PUBLIC.COMDOC.CDOC_PRO
    
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
//trae comentario del cren
consurModel.getComentarios = async function(folio, callback) {
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
        CREN_COMENT as 'comentario'
        FROM PUBLIC.COMREN
        WHERE PUBLIC.COMREN.CREN_OPE=1
        AND PUBLIC.COMREN.CREN_FOL='` + folio + `'
        AND PUBLIC.COMREN.CREN_MOV='C'
        AND PUBLIC.COMREN.CREN_CANT=-1
    
    
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

module.exports = consurModel;
