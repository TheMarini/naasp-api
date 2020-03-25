'use strict';
module.exports = (sequelize, DataTypes) => {
  const Telefone = sequelize.define('Telefone', {
    pessoaId: DataTypes.INTEGER,
    numero: DataTypes.INTEGER,
    ddd: DataTypes.INTEGER
  }, {});
  Telefone.associate = function(models) {
    // associations can be defined here
  };
  return Telefone;
};