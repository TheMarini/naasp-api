'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sessao = sequelize.define('Sessao', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    dataSessao: DataTypes.DATE,
    acolhidoId: DataTypes.INTEGER,
    voluntarioId: DataTypes.INTEGER,
    presenca: DataTypes.STRING,
    observacao: DataTypes.STRING
  }, {});
  Sessao.associate = function(models) {
    // associations can be defined here
  };
  return Sessao;
};