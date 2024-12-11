const express = require('express');
const router = express.Router();
const session = require('express-session');
const persist = require('node-persist');
const multer = require('multer');
const sequelize = require('../libs/sequelize');
// Módulos internos
const { ensureAuthenticated } = require('../../middlewares/authMiddleware');
const { models } = require('../libs/sequelize');
const {validatorHandler} = require('../../middlewares/validator.handler');
const { createCategoriaSchema, deleteCategoriaSchema } = require('../../schemas/admincategorias');






// Rutas
// obtener categorias
router.get('/',ensureAuthenticated, async (req, res) => {    
        let categoria = await models.Cat.findAll();
        res.render('tienda/admincategorias', { categoria: categoria });       
   
});

//web crear
router.get('/create',ensureAuthenticated, (req, res) => {
    console.log("ENTRO A OBTENER EL FORMULARIO")
    res.render('tienda/catcreate');
});

router.post('/',ensureAuthenticated,validatorHandler(createCategoriaSchema, 'body'),  async (req, res) => {
    try {
      const { nombre_categoria } = req.body;
  
      // Verifica que se proporciona un valor para nombre_categoria
      if (!nombre_categoria) {
        return res.status(400).json({ error: 'El nombre de la categoría es obligatorio' });
      }
  
      // Crea y guarda la nueva categoría
      const nuevaCategoria = await models.Cat.create({
        nombre_categoria,
      });
  
      res.redirect('/admincategorias');
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  });


//web eliminar
router.post('/delete/:id',ensureAuthenticated, validatorHandler(deleteCategoriaSchema, 'params'), async (req, res) => {
    //console.log(req.params.id);
    const id_categoria = req.params.id; 
  
    try {
        const deletedCount = await models.Cat.destroy({ where: { id_categoria } });        
        if (deletedCount === 0) {
            res.status(404).json({ error: 'categoria no encontrado' });
            return;
        }
        res.redirect('/admincategorias');
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Web ACTUALIZAR (Vista)
router.get('/update/:id',ensureAuthenticated, async (req, res) => {
    const id_categoria = req.params.id;
    try {
        const categoria = await models.Cat.findByPk(id_categoria);
        if (categoria) {
            res.render('tienda/catupdate',{ categoria });
        } else {
            res.status(404).send('Registro no encontrado');
        }
    } catch (error) {
        res.status(500).send('Error interno del servidor');
    }
});

// Procesar la actualización
router.post('/update/:id', validatorHandler(createCategoriaSchema, 'body'), async (req, res) => {
    const id_categoria = req.params.id;
    const newData = req.body;

    try {
        const categoria = await models.Cat.findByPk(id_categoria);

        if (categoria) {
            await categoria.update(newData);
            res.redirect('/admincategorias');
        } else {
            res.status(404).send('Registro no encontrado');
        }
    } catch (error) {
        res.status(500).send('Error interno del servidor');
    }
});

module.exports = router;