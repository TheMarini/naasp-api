'use strict';
module.exports = (sequelize, DataTypes) => {
  const Telefone = sequelize.define('Telefone', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    pessoaId: DataTypes.INTEGER,
    numero: DataTypes.INTEGER,
    ddd: DataTypes.INTEGER
  }, {});
  Telefone.associate = function(models) {
    // associations can be defined here
  };
  return Telefone;
};