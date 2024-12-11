const {TienModel,TienSchema} = require('./tienda.models')
const{CatModel,CatSchema} = require('./categoriamodels')
const{CarModel,CarSchema} = require('./carrito.models')
const{UserModel,UserSchema} = require('./user.model')

function setUpModels(sequelize) {
TienModel.init(TienSchema,TienModel.config(sequelize));
CatModel.init(CatSchema,CatModel.config(sequelize));
CarModel.init(CarSchema,CarModel.config(sequelize));
UserModel.init(UserSchema,UserModel.config(sequelize));
}

module.exports = setUpModels;