'use strict';
module.exports = (sequelize, DataTypes) => {
  const AbusoAlcoolFamilia = sequelize.define('AbusoAlcoolFamilia', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    descricao: DataTypes.STRING,
    acolhidoId: DataTypes.INTEGER
  }, {});
  AbusoAlcoolFamilia.associate = function(models) {
    // associations can be defined here
  };
  return AbusoAlcoolFamilia;
};