const Joi = require('joi');

const carritoSchema = Joi.object({
    nombre_cliente: Joi.string().required(),
    apellido_cliente: Joi.string().required(),
    cedula_cliente: Joi.string().required(),
    telefono_cliente: Joi.string().required(),
    direccion_cliente: Joi.string().required(),
    fecha_compra: Joi.date().required(),
    productos: Joi.array().items(
        Joi.object({
            id: Joi.number().required(),
            nombre: Joi.string().required(),
            precio: Joi.number().required(),
            // Agrega otras validaciones según sea necesario
        })
    ),
});

module.exports = {carritoSchema};