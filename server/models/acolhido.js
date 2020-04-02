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
    PessoaId: DataTypes.INTEGER,
    ReligiaoId: DataTypes.INTEGER,
    updatedAt: DataTypes.DATE,
    createdAt: DataTypes.DATE
  }, {
    freezeTableName: true
  });

  Acolhido.associate = function (models) {
    Acolhido.belongsTo(models.Pessoa, {
      foreignKey: 'PessoaId'
    });
    Acolhido.belongsTo(models.Religiao, {
      foreignKey: 'ReligiaoId'
    });
    Acolhido.hasMany(models.Familiar)
    Acolhido.hasMany(models.DoencaFamilia)
    Acolhido.hasMany(models.MedicamentoContinuo)
  };

  Acolhido.adiciona = async function (models, param) {
    let {
      endereco,
      cidade,
      bairro,
      pessoa,
      religiao,
      acolhidoParam,
      familiares = [],
      medicamentos = [],
      doencaFamilia = [],
    } = param

    let queryOptions = {}
    let transaction = null

    try {
      //religiaoInstance - array
      let religiaoInstance = await models.Religiao.pesquisaOuAdiciona(religiao)
      let pessoaInstance = await models.Pessoa.adiciona(models, transaction, {
        pessoa,
        endereco,
        cidade,
        bairro
      })
      // console.log("RELIGIAO datavalues", religiaoInstance[0].)
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
        PessoaId: pessoaInstance.dataValues.id,
        ReligiaoId: religiaoInstance[0].dataValues.id
      }, {
        queryOptions
      })
      let AcolhidoId = acolhidoInstance.dataValues.id
      let medicamentoContinuo = await models.MedicamentoContinuo.adicionaVarios(medicamentos, AcolhidoId)
      let familiaresInstance = await models.Familiar.adicionaVarios(familiares, AcolhidoId)
      // await models.DoencaFamilia.adicionaVarios(doencaFamilia, AcolhidoId)
      // await transaction.commit()

      return acolhidoInstance
    } catch (error) {
      // await transaction.rollback();
      console.log("\n", error, "\n")
      throw util.checkError(error, modelName)
    }

  }

  Acolhido.edita = async function (models, param) {
    let {
      endereco,
      cidade,
      bairro,
      pessoa,
      religiao,
      acolhidoParam,
      familiares = [],
      medicamentos = [],
      doencaFamilia = [],
    } = param

    let queryOptions = {}
    let transaction = null

    try {
      //religiaoInstance - array
      let religiaoInstance = await models.Religiao.pesquisaOuAdiciona(religiao)
      let pessoaInstance = await models.Pessoa.edita(models, transaction, {
        pessoa,
        endereco,
        cidade,
        bairro
      })
      // console.log("RELIGIAO datavalues", religiaoInstance[0].)
      queryOptions.transaction = transaction

      if (!religiaoInstance || !pessoaInstance) {
        // transaction.rollback();
        return util.defineError(412, "Erro em religião")
      }

      let acolhidoInstance = await Acolhido.update({
        atividade_fisica: acolhidoParam.atividade_fisica,
        bebida_quantidade: acolhidoParam.bebida_quantidade,
        bebida_periodicidade: acolhidoParam.bebida_periodicidade,
        paroquia: acolhidoParam.paroquia,
        atividades_religiosas: acolhidoParam.atividades_religiosas,
        localNascimento: acolhidoParam.localNascimento,
        demanda: acolhidoParam.demanda,
        encaminhamento: acolhidoParam.encaminhamento,
        observacao: acolhidoParam.observacao,
        PessoaId: pessoaInstance.dataValues.id,
        ReligiaoId: religiaoInstance[0].dataValues.id
      }, {
        queryOptions
      })
      let AcolhidoId = acolhidoInstance.dataValues.id
      let medicamentoContinuo = await models.MedicamentoContinuo.adicionaVarios(medicamentos, AcolhidoId)
      let familiaresInstance = await models.Familiar.adicionaVarios(familiares, AcolhidoId)
      // await models.DoencaFamilia.adicionaVarios(doencaFamilia, AcolhidoId)
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

  Acolhido.pesquisaAcolhidoCompleto = async function (models, id) {
    let {
      Religiao,
      Pessoa,
      Endereco,
      Cidade,
      Bairro,
      Familiar,
      DoencaFamilia,
      MedicamentoContinuo
    } = models

    try {
      let acolhidoInstance = await Acolhido.findByPk(id, {
        include: [{
            model: Religiao,
            attributes: ['nome'],
            as: 'Religiao'
          },
          {
            model: Pessoa,
            as: 'Pessoa',
            include: [{
              model: Endereco,
              as: 'Endereco',
              include: [{
                model: Cidade,
                attributes: ['nome'],
                as: 'Cidade'
              }, {
                model: Bairro,
                attributes: ['nome'],
                as: 'Bairro'
              }]
            }]
          }, {
            model: Familiar,
            as: 'Familiars'
          }, {
            model: DoencaFamilia,
            as: 'DoencaFamilia'
          }, {
            model: MedicamentoContinuo,
            as: 'MedicamentoContinuos'
          }
        ]
      })
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

  Acolhido.deleta = async function (idParam, transaction) {
    let queryOptions = {
      where: {
        id: idParam
      }
    }
    
    if (transaction)
      queryOptions.transaction = transaction

    try {
      let acolhido = await Acolhido.destroy(queryOptions)
      return acolhido
    } catch (error) {
      console.log("\n catch \n")
      throw util.checkError(error, modelName)
    }
  }


  return Acolhido;
};