'use strict';
module.exports = (sequelize, DataTypes) => {
  const Contato = sequelize.define('Contato', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    status: DataTypes.STRING,
    usuarioId: DataTypes.INTEGER,
    acolhidoId: DataTypes.INTEGER
  }, {});
  Contato.associate = function(models) {
    // associations can be defined here
  };
  return Contato;
};