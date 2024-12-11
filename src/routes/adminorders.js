const express = require('express');
const router = express.Router();
const session = require('express-session');
const persist = require('node-persist');
const multer = require('multer');
const sequelize = require('../libs/sequelize');
const { ensureAuthenticated } = require('../../middlewares/authMiddleware');
// Módulos internos
const { models } = require('../libs/sequelize');




// Rutas
// obtener carrito
router.get('/',ensureAuthenticated, async (req, res) => {    
        let carrito = await models.Car.findAll();
        
        res.render('tienda/adminorders', { carrito: carrito });       
   
});









module.exports = router;