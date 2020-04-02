'use strict';
module.exports = (sequelize, DataTypes) => {
  const Voluntario = sequelize.define('Voluntario', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    especialidade: DataTypes.STRING,
    pessoaId: DataTypes.INTEGER,
    updatedAt: DataTypes.DATE,
    createdAt: DataTypes.DATE
  }, {freezeTableName: true});
  Voluntario.associate = function(models) {
    // associations can be defined here
    Voluntario.belongsTo(models.Pessoa, {
      foreignKey: 'pessoaId'
    });
  };
  return Voluntario;
};
