const Joi = require('joi');

const adminproductsSchema = Joi.object({
    nombre_producto: Joi.string().required(),
    precio_producto: Joi.number().required(),
    descripcion_producto: Joi.string().required(),
    imagen_producto: Joi.string().required(),
    id_categoria: Joi.number().required(),
});

module.exports = {
    adminproductsSchema,
};