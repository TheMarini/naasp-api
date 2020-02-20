'use strict';
module.exports = (sequelize, DataTypes) => {
  const DoencaFamilia = sequelize.define('DoencaFamilia', {
    doenca: DataTypes.STRING,
    parente: DataTypes.STRING,
    acolhidoId: DataTypes.INTEGER
  }, {});
  DoencaFamilia.associate = function(models) {
    // associations can be defined here
  };
  return DoencaFamilia;
};