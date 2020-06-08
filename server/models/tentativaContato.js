'use strict';
module.exports = (sequelize, DataTypes) => {
  const TentativaContato = sequelize.define('TentativaContato', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    horario: DataTypes.DATE,
    presenca: DataTypes.BOOLEAN,
    AcolhidoId: DataTypes.INTEGER,
    UsuarioId: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {});
  TentativaContato.associate = function(models) {
    TentativaContato.belongsTo(models.Usuario, {
      foreignKey: 'UsuarioId'
    })
    TentativaContato.belongsTo(models.Acolhido, {
      foreignKey: 'AcolhidoId'
    })
  };
  return TentativaContato;
};