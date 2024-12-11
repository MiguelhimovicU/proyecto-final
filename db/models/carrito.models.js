const{Model, DataTypes} = require('sequelize');

const CAR_TABLE = 'carrito';

const CarSchema={
    id_carrito: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre_cliente: {
        type: DataTypes.STRING(),
        allowNull: false,
    },
    apellido_cliente: {
        type: DataTypes.STRING(),
        allowNull: false,
    },
    cedula_cliente: {
        type: DataTypes.STRING(),
        allowNull: false,
    },
    telefono_cliente: {
        type: DataTypes.STRING(),
        allowNull: false,
    },
    direccion_cliente: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    
    fecha_compra: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    productos: {
        type: DataTypes.JSON,
        allowNull: false,
    },
 
       
};

    class CarModel extends Model {
        static associate(models){
            
        }
        static config(sequelize){
            return {
                sequelize,
                modelName: 'Car',
                tableName: CAR_TABLE,                
                timestamps: false
            }
        }
    }

    module.exports = {CarModel, CarSchema, CAR_TABLE};