'use strict';
const util = require("../util")
const modelName = "Acolhido"


module.exports = (sequelize, DataTypes) => {

  const Acolhido = sequelize.define('Acolhido', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    atividade_fisica: DataTypes.STRING,
    atividades_religiosas: DataTypes.STRING,
    bebida_quantidade: DataTypes.STRING,
    bebida_periodicidade: DataTypes.STRING,
    demanda: DataTypes.STRING,
    encaminhamento: DataTypes.STRING,
    numero_cigarros_por_dia: DataTypes.STRING,
    observacao: DataTypes.STRING,
    paroquia: DataTypes.STRING,
    preferenciaAtendimento: {
      allowNull: false,
      type: DataTypes.STRING
    },
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
  })

  Acolhido.associate = function (models) {
    Acolhido.belongsTo(models.Pessoa, {
      foreignKey: 'PessoaId'
    })
    Acolhido.belongsTo(models.Religiao, {
      foreignKey: 'ReligiaoId'
    })
    Acolhido.belongsTo(models.Status, {
      foreignKey: 'StatusId'
    })
    Acolhido.hasMany(models.Familiar, {
      as: {
        singular: "familiar",
        plural: "familiares"
      }
    })
    Acolhido.hasMany(models.DoencaFamilia, {
      as: {
        singular: "doencaFamilia",
        plural: "doencasFamilia"
      }
    })
    Acolhido.hasMany(models.MedicamentoContinuo, {
      as: {
        singular: "medicamentoContinuo",
        plural: "medicamentosContinuos"
      }
    })
    Acolhido.hasMany(models.Sessao)
  }

  Acolhido.adiciona = async function (models, param) {
    let t = await sequelize.transaction({ autocommit: false })
    let acolhidoParam = param.acolhidoParam ? param.acolhidoParam : {}
    let acolhidoInstance = null

    try {
      acolhidoInstance = await cadastra(acolhidoParam, t)
      let status = await preencheAssociacoes(models, acolhidoInstance, param, t)

      await t.commit()
      return {
        status: status
      }
    } catch (error) {
      await t.rollback();
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

      if (modelStatus.pesquisa(idStatus) == null)
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

      if (pessoa.cpf && !data.StatusId)
        data.StatusId = 2

      let acolhidoInstance = await Acolhido.update({ data }, queryOptions)

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
          as: 'familiares'
        }, {
          model: DoencaFamilia,
          as: 'doencasFamilia'
        }, {
          model: MedicamentoContinuo,
          as: 'medicamentosContinuos'
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
          as: 'familiares'
        }, {
          model: DoencaFamilia,
          as: 'doencasFamilia'
        }, {
          model: MedicamentoContinuo,
          as: 'medicamentosContinuos'
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

      if (modelStatus.pesquisa(idStatus) == null)
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

  function valida(acolhido) {
    let {
      preferenciaAtendimento
    } = acolhido
    if (preferenciaAtendimento != null)
      return true

    throw util.defineError(412, "Erro em Acolhido")
  }

  async function cadastra(acolhidoParam, t) {
    let queryOptions = t ? t : {}
    let acolhidoInstance = null

    let acolhido = {
      atividade_fisica: acolhidoParam.atividade_fisica,
      bebida_quantidade: acolhidoParam.bebida_quantidade,
      bebida_periodicidade: acolhidoParam.bebida_periodicidade,
      paroquia: acolhidoParam.paroquia,
      atividades_religiosas: acolhidoParam.atividades_religiosas,
      demanda: acolhidoParam.demanda,
      encaminhamento: acolhidoParam.encaminhamento,
      observacao: acolhidoParam.observacao,
      preferenciaAtendimento: acolhidoParam.preferenciaAtendimento,
      prioridade: acolhidoParam.prioridade,
    }
    valida(acolhido)

    return await Acolhido.create(acolhido, queryOptions)
  }

  async function preencheAssociacoes(models, acolhidoInstance, param, t) {
    let {
      enderecoParam = {},
      cidadeParam = {},
      bairroParam = {},
      pessoaParam = {},
      religiaoParam = {},
      familiaresParam = [],
      medicamentosParam = "",
      doencaFamiliaParam = []
    } = param
    
    let religiaoInstance = null
    let pessoaInstance = null
    let medicamentoContinuoInstance = null
    let familiaresInstance = null
    let status = (pessoaParam && pessoaParam.cpf) ? 2 : 1
    
    if (religiaoParam != null)
      religiaoInstance = await models.Religiao.pesquisaOuAdiciona(religiaoParam, t)
    
    console.log(religiaoParam)
    pessoaInstance = await models.Pessoa.adiciona(models, null, {
      pessoaParam,
      enderecoParam,
      cidadeParam,
      bairroParam
    })

    if (!pessoaInstance)
      throw util.defineError(500, "Erro em Pessoa")

    await acolhidoInstance.setPessoa(pessoaInstance, { transaction: t })
    await acolhidoInstance.setReligiao(religiaoInstance, { transaction: t })
    await acolhidoInstance.setStatus(status, { transaction: t })

    if (medicamentosParam != "") {
      let medicamentos = []

      medicamentosParam.split(",").forEach(element => {
        medicamentos.push(element)
      })

      medicamentoContinuoInstance = await models.MedicamentoContinuo.adicionaVarios(medicamentos, t)
      await acolhidoInstance.setMedicamentosContinuos(medicamentoContinuoInstance, { transaction: t })
    }

    if (familiaresParam.length > 0) {
      familiaresInstance = await models.Familiar.adicionaVarios(familiaresParam, t)
      await acolhidoInstance.setFamiliares(familiaresInstance, { transaction: t })
    }
//  ARRANJO TECNICO
    return status

  }

  return Acolhido;
};