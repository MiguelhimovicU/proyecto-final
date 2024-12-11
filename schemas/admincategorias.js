

const Joi = require('joi');

// Esquema para la creación de categorías
const createCategoriaSchema = Joi.object({
    nombre_categoria: Joi.string().required(),
});

// Esquema para la eliminación de categorías
const deleteCategoriaSchema = Joi.object({
    id: Joi.number().required(),
});

module.exports = {
    createCategoriaSchema,
    deleteCategoriaSchema,
};