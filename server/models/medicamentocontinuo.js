'use strict';
module.exports = (sequelize, DataTypes) => {
  const MedicamentoContinuo = sequelize.define('MedicamentoContinuo', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    medicamento: DataTypes.STRING,
    acolhidoId: DataTypes.INTEGER,
    familiarId: DataTypes.INTEGER
  }, {});
  MedicamentoContinuo.associate = function(models) {
    // associations can be defined here
  };
  return MedicamentoContinuo;
};