'use strict';
module.exports = (sequelize, DataTypes) => {
  const Voluntario = sequelize.define('Voluntario', {
    especialidade: DataTypes.STRING,
    pessoaId: DataTypes.INTEGER,
    updatedAt: DataTypes.DATE,
    createdAt: DataTypes.DATE
  }, {freezeTableName: true});
  Voluntario.associate = function(models) {
    // associations can be defined here
    Voluntario.belongsTo(models.pessoa, {
      foreignKey: 'pessoaId'
    });
  };
  return Voluntario;
};
