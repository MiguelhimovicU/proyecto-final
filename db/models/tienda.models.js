const{Model, DataTypes} = require('sequelize');

const TIEN_TABLE = 'tienda';

const TienSchema={
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    marca: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    
    precio: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },  
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    imagen: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    id_categoria: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'categoria',  // Nombre de la tabla a la que hace referencia
            key: 'id_categoria'  // Nombre de la columna en la tabla referenciada
        }
       
    },
    
};

class TienModel extends Model {
    static associate(models) {
        TienModel.belongsTo(models.CatModel, { foreignKey:'id_categoria',as:'categoria' });
        TienModel.hasMany(models.CarModel, { foreignKey:'id_producto',as:'carrito' });
        TienModel.belongsTo(models.ClienModel, { foreignKey:'id_cliente',as:'cliente' });
    }
    // ... otras configuraciones del modelo

    static config(sequelize) {
        return {
            sequelize,
            modelName: 'Tien',
            tableName: TIEN_TABLE,
            timestamps: false
        };
    }
}

module.exports = {  TienModel,TienSchema,TIEN_TABLE };