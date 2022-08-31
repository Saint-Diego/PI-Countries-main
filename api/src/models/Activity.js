const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Activity', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    name: DataTypes.STRING,
    difficulty: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
        max: 5,
      },
    },
    length: {
      type: DataTypes.INTEGER,
      get() {
        return `${length} horas`
      }
    },
    season: {
      type: DataTypes.STRING,
      validate: {
        isIN: [['Verano', 'Otoño', 'Invierno', 'Primavera']],
      },
    },
  },
  {
    timestamps: false,
  });
};
