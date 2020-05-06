'use strict';
const util = require("../util")

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
    encaminhamento: DataTypes.STRING,
    observacao: DataTypes.STRING,
    preferenciaAtendimento: DataTypes.STRING,
    prioridade: DataTypes.INTEGER,
    PessoaId: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    ReligiaoId: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    StatusId: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
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
      acolhido,
      familiares = [],
      medicamentos = [],
      doencaFamilia = [],
    } = param

    let queryOptions = {}
    let transaction = null
    // let transaction = await sequelize.transaction({type: sequelize.Transaction}) 

    try {
      let religiaoInstance = null
      let pessoaRetorno = null

      if(religiao)
        religiaoInstance = await models.Religiao.pesquisaOuAdiciona(religiao, transaction)
      
      if(pessoa)
        pessoaRetorno = await models.Pessoa.adiciona(models, transaction, {
          pessoa,
          endereco,
          cidade,
          bairro
        })

      // if (!religiaoInstance)
      //   return util.defineError(412, "Erro em religião")

      // if (!pessoaInstance)
      //   return util.defineError(412, "Erro em Pessoa")

      if (transaction)
        queryOptions.transaction = transaction

      let data = {
        atividade_fisica: acolhido.atividade_fisica,
        bebida_quantidade: acolhido.bebida_quantidade,
        bebida_periodicidade: acolhido.bebida_periodicidade,
        paroquia: acolhido.paroquia,
        atividades_religiosas: acolhido.atividades_religiosas,
        demanda: acolhido.demanda,
        encaminhamento: acolhido.encaminhamento,
        observacao: acolhido.observacao,
        prioridade: acolhido.prioridade,
        PessoaId: (pessoaRetorno)? pessoaRetorno.pessoaInstance.dataValues.id: null,
        ReligiaoId: (religiaoInstance)? religiaoInstance[0].dataValues.id : null
      }
      if(pessoa && pessoa.cpf)
        data.StatusId = 2

      let acolhidoInstance = await Acolhido.create( data, { queryOptions } )
      
      let AcolhidoId = acolhidoInstance.dataValues.id
      if(medicamentos)
        let medicamentoContinuoInstance = await models.MedicamentoContinuo.adicionaVarios(medicamentos, AcolhidoId, transaction)

      if(familiares)
        let familiaresInstance = await models.Familiar.adicionaVarios(familiares, AcolhidoId, transaction)

      // await transaction.commit()
      return {
          pessoa: (pessoa)? pessoaRetorno.pessoaInstance.dataValues: null,
          endereco: (endereco)? pessoaRetorno.enderecoInstance.dataValues: null,
          acolhido: acolhidoInstance.dataValues,
          familiaresInstance:(familiares)? familiaresInstance.dataValues : null,
          medicamentoContinuo: (medicamentoContinuo)? medicamentoContinuoInstance.dataValues : null
        }

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
      acolhido,
      familiares = [],
      medicamentos = [],
      doencaFamilia = [],
    } = param

    let queryOptions = {}
    let transaction = null

    try {

      if(modelStatus.pesquisa(idStatus) == null) 
        throw util.defineError(404, "Status não econtrado.")

      let religiaoInstance = await models.Religiao.pesquisaOuAdiciona(religiao)
      let pessoaInstance = await models.Pessoa.edita(models, transaction, {
        pessoa,
        endereco,
        cidade,
        bairro
      })

      if (transaction)
        queryOptions.transaction = transaction

      queryOptions.where = {
        id: acolhido.id
      }

      if (!religiaoInstance || !pessoaInstance) {
        // transaction.rollback();
        return util.defineError(412, "Erro em religião")
      }

      let data = {
        atividade_fisica: acolhido.atividade_fisica,
        bebida_quantidade: acolhido.bebida_quantidade,
        bebida_periodicidade: acolhido.bebida_periodicidade,
        paroquia: acolhido.paroquia,
        atividades_religiosas: acolhido.atividades_religiosas,
        demanda: acolhido.demanda,
        encaminhamento: acolhido.encaminhamento,
        observacao: acolhido.observacao,
        prioridade: acolhido.prioridade,
        ReligiaoId: religiaoInstance[0].dataValues.id,
        StatusId: acolhido.StatusId
      }

      if(pessoa.cpf && !data.StatusId)
        data.StatusId = 2
      
      let acolhidoInstance = await Acolhido.update({data}, queryOptions)

      medicamentos.forEach(async medicamento => {
        await models.MedicamentoContinuo.edita(medicamento)
      });

      familiares.forEach(async familiar => {
        await models.Familiar.edita(familiar)
      });
      // await models.DoencaFamilia.adicionaVarios(doencaFamilia, AcolhidoId)
      // await transaction.commit()

      return acolhidoInstance
    } catch (error) {
      // await transaction.rollback();
      console.log("\n", error, "\n")
      throw util.checkError(error, modelName)
    }

  }

  Acolhido.pesquisa = async function (models, id) {
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

  Acolhido.lista = async function (models) {
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
      let acolhidoInstance = await Acolhido.findAll({
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

  Acolhido.listaFilaPorStatus = async function (idStatus, modelStatus) {

    let queryOptions = {
      where: {
        StatusId: idStatus
      }
    }

    try {

      if(modelStatus.pesquisa(idStatus) == null) 
        throw util.defineError(404, "Status não econtrado.")

      let acolhidoInstance = await Acolhido.findAll({
        include: [{
          model: models.Pessoa,
          as: 'Pessoa'
        }]
      }, queryOptions)
      return acolhidoInstance
    } catch (error) {
      console.log("\n catch \n")
      throw util.checkError(error, modelName)
    }
  }

  return Acolhido;
};