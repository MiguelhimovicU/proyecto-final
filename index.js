require('dotenv').config()
const express = require('express');
const multer = require('multer');
const tienda = require('./src/routes/tienda');
const carrito = require('./src/routes/carrito');
const adminproducts = require('./src/routes/adminproducts');
const admincategorias = require('./src/routes/admincategorias');
const adminorders = require('./src/routes/adminorders');

const app = express();
const PORT = process.env.PORT || 3000;
const APP_NAME = process.env.APP_NAME || 'My App';
const {models} = require('./src/libs/sequelize');
const session = require('express-session');
const persist = require('node-persist');
const authRouter = require('./src/routes/users.routes');


// Configura node-persist
persist.init().then(() => {

// Middleware
app.use(session({
    secret: 'ingenieria informatica', // Cambia esto con una cadena de texto secreta
    resave: true,
    saveUninitialized: true
  }));
  require('./src/config/passport')(app);

app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use('/public', express.static('public'));
app.use(express.json());




//Usar el motor de plantillas de EJS
app.set('views','./src/views');
app.set('view engine', 'ejs');
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
})

app.use('/tienda',tienda);
app.use('/carrito',carrito);
app.use('/auth', authRouter);
app.use('/adminproducts', adminproducts);
app.use('/admincategorias', admincategorias);
app.use('/adminorders', adminorders);

}).catch(error => console.error('Error al configurar node-persist:', error));

app.listen(PORT, () => {
    console.log(`${APP_NAME} is running on http://localhost:${PORT}`);
});