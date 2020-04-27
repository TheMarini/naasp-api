'use strict';
module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define('Usuario', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    login: DataTypes.STRING,
    senha: DataTypes.STRING,
    perfil: DataTypes.STRING,
    PessoaId: DataTypes.INTEGER,
    updatedAt: DataTypes.DATE,
    createdAt: DataTypes.DATE
  }, {freezeTableName: true});
  Usuario.associate = function(models) {
    // associations can be defined here
    Usuario.belongsTo(models.Pessoa, {
      foreignKey: 'PessoaId'
    });
  };
  return Usuario;
};
