'use strict';
module.exports = (sequelize, DataTypes) => {
  const MedicamentoContinuo = sequelize.define('MedicamentoContinuo', {
    medicamento: DataTypes.STRING,
    acolhidoId: DataTypes.INTEGER,
    familiarId: DataTypes.INTEGER
  }, {});
  MedicamentoContinuo.associate = function(models) {
    // associations can be defined here
  };
  return MedicamentoContinuo;
};