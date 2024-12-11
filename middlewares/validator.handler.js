function validatorHandler(schema, property) {
    return async (req, res, next) => {
        const data = req[property];

        try {
            await schema.validateAsync(data, { stripUnknown: true, abortEarly: false });
            next();
        } catch (error) {
            if (error.isJoi) {
                // Errores de validación de Joi
                const validationErrors = error.details.map((err) => err.message);
                res.status(422).json({ errors: validationErrors });
            } else {
                // Otros errores
                console.error(error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        }
    };
}

module.exports =  { validatorHandler } ;
