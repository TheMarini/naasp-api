'use strict';
const util = require("../util")
const models = require('./index')

const modelName = "Acolhido"
module.exports = (sequelize, DataTypes) => {

  const Acolhido = sequelize.define('Acolhido', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    atividade_fisica: DataTypes.STRING,
    bebida_quantidade: DataTypes.STRING,
    bebida_periodicidade: DataTypes.STRING,
    numero_cigarros_por_dia: DataTypes.STRING,
    paroquia: DataTypes.STRING,
    atividades_religiosas: DataTypes.STRING,
    demanda: DataTypes.STRING,
    localNascimento: DataTypes.STRING,
    encaminhamento: DataTypes.STRING,
    observacao: DataTypes.STRING,
    pessoaId: DataTypes.INTEGER,
    religiaoId: DataTypes.INTEGER,
    updatedAt: DataTypes.DATE,
    createdAt: DataTypes.DATE
  }, {
    freezeTableName: true
  });

  Acolhido.associate = function (models) {
    Acolhido.belongsTo(models.Pessoa, {
      foreignKey: 'pessoaId'
    });
    Acolhido.belongsTo(models.Religiao, {
      foreignKey: 'religiaoId'
    });
  };

  Acolhido.adiciona = async function (models, param) {
    let {
      endereco,
      cidade,
      bairro,
      pessoa,
      religiao,
      acolhidoParam
    } = param

    let queryOptions = {}
    let transaction = null

    try {
      let religiaoInstance = await models.Religiao.pesquisaOuAdiciona(religiao)
      let pessoaInstance = await models.Pessoa.adiciona(models, transaction, {
        pessoa,
        endereco,
        cidade,
        bairro
      })

      queryOptions.transaction = transaction

      if (!religiaoInstance || !pessoaInstance) {
        // transaction.rollback();
        return util.defineError(412, "Erro em religião")
      }

      let acolhidoInstance = await Acolhido.create({
        atividade_fisica: acolhidoParam.atividade_fisica,
        bebida_quantidade: acolhidoParam.bebida_quantidade,
        bebida_periodicidade: acolhidoParam.bebida_periodicidade,
        paroquia: acolhidoParam.paroquia,
        atividades_religiosas: acolhidoParam.atividades_religiosas,
        localNascimento: acolhidoParam.localNascimento,
        demanda: acolhidoParam.demanda,
        encaminhamento: acolhidoParam.encaminhamento,
        observacao: acolhidoParam.observacao,
        pessoaId: pessoaInstance.id,
        religiaoId: religiaoInstance.id
      }, {
        queryOptions
      })

      // await transaction.commit()

      return acolhidoInstance
    } catch (error) {
      // await transaction.rollback();
      console.log("\n", error, "\n")
      throw util.checkError(error, modelName)
    }

  }

  Acolhido.pesquisa = async function (id) {
    try {
      let acolhidoInstance = await Acolhido.findByPk(id)
      return acolhidoInstance
    } catch (error) {
      console.log("\n catch \n")
      throw util.checkError(error, modelName)
    }
  }

  Acolhido.lista = async function (id) {
    try {
      let acolhidoInstance = await Acolhido.findAll()
      return acolhidoInstance
    } catch (error) {
      console.log("\n catch \n")
      throw util.checkError(error, modelName)
    }
  }

  return Acolhido;
};