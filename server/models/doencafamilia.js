'use strict';
module.exports = (sequelize, DataTypes) => {
  const DoencaFamilia = sequelize.define('DoencaFamilia', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    doenca: DataTypes.STRING,
    parente: DataTypes.STRING,
    acolhidoId: DataTypes.INTEGER
  }, {});
  DoencaFamilia.associate = function(models) {
    // associations can be defined here
  };
  return DoencaFamilia;
};