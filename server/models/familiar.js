'use strict';
module.exports = (sequelize, DataTypes) => {
  const Familiar = sequelize.define('Familiar', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    nome: DataTypes.STRING,
    parentesco: DataTypes.STRING,
    data_nascimento: DataTypes.DATE,
    escolaridade: DataTypes.STRING,
    ocupacao: DataTypes.STRING,
    cohabita: DataTypes.BOOLEAN,
    telefone: DataTypes.INTEGER,
    renda: DataTypes.INTEGER,
    responsavel: DataTypes.BOOLEAN,
    rg: DataTypes.INTEGER
  }, {});
  Familiar.associate = function(models) {
    // associations can be defined here
  };
  return Familiar;
};