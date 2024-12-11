const joi = require('joi');


const nombre = joi.string().max(50);
const marca = joi.string().max(50);
const precio = joi.number().integer();
const descripcion = joi.string().max(300);
const id_categoria = joi.number().integer();


const postTienSchema = joi.object({
    nombre: nombre.required(),
    marca: marca.required(),
    precio: precio.required(),
    descripcion: descripcion.required(),    
    id_categoria: id_categoria.required(),
});

module.exports = {
    
    postTienSchema,
};