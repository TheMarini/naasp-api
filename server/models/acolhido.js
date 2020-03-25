'use strict';
// const models = require('../models')

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
  }, {
    freezeTableName: true
  });

  Acolhido.associate = function (models) {
    Acolhido.belongsTo(models.Pessoa, {
      foreignKey: 'pessoaId'
    });
  };

  Acolhido.adiciona = async function (PessoaModel, pessoaParam, acolhidoParam) {
    let pessoaInstance = await PessoaModel.adiciona(pessoaParam)
    try {
      return await Acolhido.create({
        atividade_fisica: acolhidoParam.atividade_fisica,
        bebida_quantidade: acolhidoParam.bebida_quantidade,
        bebida_periodicidade: acolhidoParam.bebida_periodicidade,
        paroquia: acolhidoParam.paroquia,
        atividades_religiosas: acolhidoParam.atividades_religiosas,
        demanda: acolhidoParam.demanda,
        encaminhamento: acolhidoParam.encaminhamento,
        observacao: acolhidoParam.observacao,
        pessoaId: pessoaInstance.id
      })
    } catch (error) {
      console.log("\n",error,"\n")
      throw util.checkError(error, modelName)
    }

  }

  return Acolhido;
};