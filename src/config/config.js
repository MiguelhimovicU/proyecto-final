const { Sequelize } = require('sequelize');
require('dotenv').config(); // Carga las variables de entorno desde el archivo .env

const sequelize = new Sequelize(
    process.env.DB_NAME, // Nombre de la base de datos
    process.env.DB_USER, // Usuario de la base de datos
    process.env.DB_PASSWORD, // Contraseña de la base de datos
    {
        host: process.env.DB_HOST, // Host de la base de datos
        dialect: 'postgres', // Dialecto (PostgreSQL)
        port: process.env.DB_PORT || 5432, // Puerto de la base de datos
        logging: console.log, // Para habilitar logs de consultas
    }
);

// Verifica la conexión antes de exportar
sequelize
    .authenticate()
    .then(() => {
        console.log('Conexión exitosa a la base de datos');
    })
    .catch(err => {
        console.error('Error al conectar con la base de datos:', err);
    });

module.exports = sequelize;
