const{Model, DataTypes} = require('sequelize');

const CATEGORIA_TABLE = 'categoria';

const CatSchema={
    id_categoria: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre_categoria: {
        type: DataTypes.STRING,
        allowNull: false
    },   
    
};

class CatModel extends Model {
    static associate(models) {
        // Definir asociaciones aquí
        
    }


    static config(sequelize) {
        return {
            sequelize,
            modelName: 'Cat',
            tableName: CATEGORIA_TABLE,
            timestamps: false
        };
    }
}

module.exports = { CatModel, CatSchema, CATEGORIA_TABLE };