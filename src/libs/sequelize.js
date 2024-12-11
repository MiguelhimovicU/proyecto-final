const {Sequelize} = require ('sequelize');
const setUpModels = require('../../db/models');

const sequelize = new Sequelize('venta_de_carros','postgres','12345',{
host: 'localhost',
dialect: 'postgres',
logging: false
});

setUpModels(sequelize);
sequelize.sync();
module.exports = sequelize;