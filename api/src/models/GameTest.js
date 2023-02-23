const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('GameTest', {
    id: {
      type: DataTypes.INTEGER,
      // defaultValue: DataTypes.UUIDV1, 
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // description: {
    //   type: DataTypes.TEXT,
      // allowNull: false,
    // },
    platforms: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    released: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    created: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    // BORRAR ATRIBUTO GENRES:

    genres: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    }
  }, { timestamps: false });
};
