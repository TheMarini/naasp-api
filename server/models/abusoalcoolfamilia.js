'use strict';
module.exports = (sequelize, DataTypes) => {
  const AbusoAlcoolFamilia = sequelize.define('AbusoAlcoolFamilia', {
    descricao: DataTypes.STRING,
    acolhidoId: DataTypes.INTEGER
  }, {});
  AbusoAlcoolFamilia.associate = function(models) {
    // associations can be defined here
  };
  return AbusoAlcoolFamilia;
};