const express = require('express');
const router = express.Router();
const { models } = require ('../libs/sequelize');
const persist = require('node-persist');
const { carritoSchema } = require('../../schemas/carrito.schema');
const { validatorHandler } = require('../../middlewares/validator.handler');

console.log(validatorHandler);  // Asegúrate de que sea una función



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
            
        }).catch(error => {
            console.error('Error al recuperar el carrito:', error);
            res.status(500).send('Error interno del servidor');
        });
    });


// Ejemplo de ruta en el servidor
router.post('/',validatorHandler(carritoSchema, 'body'), async (req, res) => {
    try {
        // Recupera el carrito almacenado
        persist.getItem('carrito').then(carrito => {
            // Si el carrito no existe, inicialízalo como un array vacío
            carrito = carrito || [];

            console.log(carrito); // Esto debería imprimir el carrito correctamente
            const product = carrito.map(producto =>({
                id : producto.id,
                nombre : producto.nombre,
                precio : producto.precio,                
            }));

            // Usa el carrito en tu renderización o lógica

            const datosCliente = {
                nombre_cliente: req.body.nombre_cliente,
                apellido_cliente: req.body.apellido_cliente,
                cedula_cliente: req.body.cedula_cliente,
                telefono_cliente: req.body.telefono_cliente,
                direccion_cliente: req.body.direccion_cliente,
                fecha_compra: req.body.fecha_compra,
                productos: product,
            };

            // Crear un nuevo registro en la tabla 'Carrito' para almacenar la información del cliente y productos
            models.Car.create(datosCliente).then(newCar => {
                persist.removeItem('carrito').then(() => {
                    console.log('Carrito limpiado');
                }).catch(error => {
                    console.error('Error al limpiar el carrito:', error);
                });
                
                res.redirect('/tienda');
            }).catch(error => {
                console.error(error);
                res.json({ message: 'Error al almacenar la carrito' });
            });

        }).catch(error => {
            console.error('Error al recuperar el carrito:', error);
            res.status(500).send('Error interno del servidor');
        });
    } catch (error) {
        console.error(error);
        res.json({ message: 'Error al procesar la compra' });
    }
});


}).catch(error => console.error('Error al configurar node-persist:', error));

// Ruta para limpiar el carrito
router.post('/limpiar', async (req, res) => {
    try {
        await persist.removeItem('carrito'); // Eliminar el carrito almacenado
        console.log('Carrito limpiado');
        res.redirect('/carrito'); // Redirige al carrito vacío
    } catch (error) {
        console.error('Error al limpiar el carrito:', error);
        res.status(500).send('Error al limpiar el carrito');
    }
});
router.get('/', async (req, res) => {
    try {
        // Recupera el carrito almacenado
        const carrito = (await persist.getItem('carrito')) || [];

        // Verificar si los productos en el carrito tienen todos los campos necesarios
        console.log(carrito); // Puedes revisar el contenido del carrito aquí

        res.render('tienda/carrito', { carrito });
    } catch (error) {
        console.error('Error al recuperar el carrito:', error);
        res.status(500).send('Error al cargar el carrito');
    }
});

router.post('/add-to-cart/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const producto = await models.Tien.findByPk(id, {
            include: { model: models.Cat, attributes: ['nombre_categoria'] }, // Incluir categoría
        });

        if (!producto) {
            res.status(404).send('Producto no encontrado');
            return;
        }

        // Obtener carrito actual
        const carrito = await persist.getItem('carrito') || [];
        console.log(producto);
        // Agregar producto al carrito con toda la información necesaria
        carrito.push({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            imagen: producto.imagen ? producto.imagen : 'default.jpg', // Asegúrate de que esté disponible
            categoria: producto.Cat.nombre_categoria, // Asegúrate de que esté disponible
        });

        // Guardar carrito actualizado
        await persist.setItem('carrito', carrito);

        res.redirect('/carrito');
    } catch (error) {
        console.error('Error al agregar al carrito:', error);
        res.status(500).send('Error interno del servidor');
    }
});




module.exports = router;









