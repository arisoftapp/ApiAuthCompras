const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
config = require('./config');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');

const app = express();
process.setMaxListeners(0);
const port = process.env.PORT || 3050;

app.set('llave', config.llave);
app.use(morgan('dev'));
app.use(cors({ credentials: true, origin: true }));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const rutasProtegidas = express.Router();
rutasProtegidas.use((req, res, next) => {
    const token = req.headers['access-token'];

    if (token) {
        jwt.verify(token, app.get('llave'), (err, decoded) => {
            if (err) {
                return res.json({ mensaje: 'Falló la autenticación del token.' });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        res.send({
            success: true,
            mensaje: 'Token no proveída.'
        });
    }
});

app.get('/prueb', cors(), (req, res) => {
    res.send({ mensaje: "hola mundo" })
})
require('./routes/login')(app, rutasProtegidas);
require('./routes/previos')(app, rutasProtegidas);
require('./routes/empresas')(app, rutasProtegidas);
require('./routes/detalles')(app, rutasProtegidas);
require('./routes/modificar')(app, rutasProtegidas);
require('./routes/comentarios')(app, rutasProtegidas);
app.listen(port, () => {
    console.log("apirest " + port);
})