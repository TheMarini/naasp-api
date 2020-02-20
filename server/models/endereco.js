'use strict';
module.exports = (sequelize, DataTypes) => {
  const Endereco = sequelize.define('Endereco', {
    pessoaId: DataTypes.INTEGER,
    bairroId: DataTypes.INTEGER,
    cidadeId: DataTypes.INTEGER,
    rua: DataTypes.STRING,
    numero: DataTypes.INTEGER,
    complemento: DataTypes.STRING,
    cep: DataTypes.INTEGER
  }, {});
  Endereco.associate = function(models) {
    // associations can be defined here
  };
  return Endereco;
};