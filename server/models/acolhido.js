'use strict';
module.exports = (sequelize, DataTypes) => {
  const Acolhido = sequelize.define('Acolhido', {
    atividade_fisica: DataTypes.STRING,
    bebida_quantidade: DataTypes.STRING,
    bebida_periodicidade: DataTypes.STRING,
    paroquia: DataTypes.STRING,
    atividades_religiosas: DataTypes.STRING,
    demanda: DataTypes.STRING,
    encaminhamento: DataTypes.STRING,
    observacao: DataTypes.STRING,
    pessoaId: DataTypes.INTEGER,
    updatedAt: DataTypes.DATE,
    createdAt: DataTypes.DATE
  }, {freezeTableName: true});
  Acolhido.associate = function(models) {
    // associations can be defined here
    Acolhido.belongsTo(models.pessoa, {
      foreignKey: 'pessoaId'
    });
  };
  return Acolhido;
};
