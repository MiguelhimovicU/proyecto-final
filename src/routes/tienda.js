const express = require('express');
const router = express.Router();
const session = require('express-session');
const persist = require('node-persist');
const sequelize = require('../libs/sequelize');
const multer = require('multer');

// Módulos internos
const { models } = require('../libs/sequelize');
const { postTienSchema } = require('../../schemas/tienda.schema');
// Configurar node-persist
persist.init({
    dir: 'mydata',
    stringify: JSON.stringify,
    parse: JSON.parse,
    encoding: 'utf8',
    logging: false,
    ttl: false,
}).then(async () => {
    // Define la ruta GET para la página de tienda
    router.get('/carrito', (req, res) => {
        console.log('Recuperando el carrito...');
        // Recupera el carrito almacenado
        persist.getItem('carrito').then(carrito => {
            // Si el carrito no existe, inicialízalo como un array vacío
            carrito = carrito || [];

            // Usa el carrito en tu renderización o lógica
            res.render('tienda/carrito', { carrito });
        }).catch(error => {
            console.error('Error al recuperar el carrito:', error);
            res.status(500).send('Error interno del servidor');
        });
    });

    // Listar Productos
    
    // Listar Productos
    router.get('/', async (req, res) => {
        try {
          const resultados = await sequelize.query('SELECT * FROM tienda INNER JOIN categoria ON tienda.id_categoria = categoria.id_categoria', {
            type: sequelize.QueryTypes.SELECT,
          });
      
          // Agrupa los productos por categoría
          const productosPorCategoria = {};
          resultados.forEach(producto => {
            const categoria = producto.nombre_categoria.toUpperCase(); // Ajusta el nombre según tu modelo
            if (!productosPorCategoria[categoria]) {
              productosPorCategoria[categoria] = [];
            }
            productosPorCategoria[categoria].push(producto);
          });
      
          res.render('tienda/index', { productosPorCategoria, search: req.query.search || '' });
        } catch (error) {
          console.error("Error en la consulta a la base de datos:", error.message);
          res.status(500).send('Error interno del servidor');
        }
      });

    // Manejar la adición al carrito
    router.post('/guardar/:id', async (req, res) => {
        const id = req.params.id;

        try {
            const producto = await models.Tien.findByPk(id);
            const categoria = await models.Cat.findByPk(producto.id_categoria);

            if (producto) {            
                // Recupera el carrito almacenado o crea uno nuevo
                const carrito = await persist.getItem('carrito') || [];
                console.log("Prueba")
                console.log(producto)
                carrito.push({
                    id: producto.id,
                    nombre: producto.nombre,
                    precio: producto.precio,
                    imagen: producto.imagen,
                    marca: producto.marca,
                    descripcion: producto.descripcion,
                    categoria: categoria.nombre_categoria,
                });

                // Almacena el carrito actualizado
                await persist.setItem('carrito', carrito);

                console.log({ message: 'Producto agregado al carrito con éxito', carrito });
                res.redirect('/tienda');
            } else {
                res.status(404).json({ message: 'Producto no encontrado' });            
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Error interno del servidor');
        }
    });
    
    
    
}).catch(error => console.error('Error al configurar node-persist:', error));

module.exports = router;