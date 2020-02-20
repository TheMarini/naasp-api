'use strict';
module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define('Usuario', {
    login: DataTypes.STRING,
    senha: DataTypes.STRING,
    perfil: DataTypes.STRING,
    pessoaId: DataTypes.INTEGER,
    updatedAt: DataTypes.DATE,
    createdAt: DataTypes.DATE
  }, {freezeTableName: true});
  Usuario.associate = function(models) {
    // associations can be defined here
    Usuario.belongsTo(models.pessoa, {
      foreignKey: 'pessoaId'
    });
  };
  return Usuario;
};
