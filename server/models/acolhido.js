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
    });
    Acolhido.hasMany(models.Familiar)
    Acolhido.hasMany(models.DoencaFamilia)
    Acolhido.hasMany(models.MedicamentoContinuo)
    // Acolhido.hasMany(models.Sessao)
  };

  Acolhido.adiciona = async function (models, param) {
    let t = await sequelize.transaction({ autocommit: false })
    let acolhidoParam = param.acolhidoParam ? param.acolhidoParam : {}
    let acolhidoInstance = null

    let {
      enderecoParam,
      cidadeParam,
      bairroParam,
      pessoaParam,
      religiaoParam,
      acolhidoParam,
      familiaresParam = [],
      medicamentos = [],
      doencaFamilia = [],
    } = param

    let queryOptions = {}
    let transaction = null
    // let transaction = await sequelize.transaction({type: sequelize.Transaction})

    try {
      acolhidoInstance = await cadastra(acolhidoParam, t)
      let status = await cadastraAssociacoes(models, acolhidoInstance, param, t)

      if(religiaoParam)
        religiaoInstance = await models.Religiao.pesquisaOuAdiciona(religiaoParam, transaction)

      if(pessoaParam)
        pessoaRetorno = await models.Pessoa.adiciona(models, transaction, {
          pessoaParam,
          enderecoParam,
          cidadeParam,
          bairroParam
        })

      // if (!religiaoInstance)
      //   return util.defineError(412, "Erro em religião")

      // if (!pessoaInstance)
      //   return util.defineError(412, "Erro em Pessoa")

      if (transaction)
        queryOptions.transaction = transaction

      let data = {
        atividade_fisica: acolhidoParam.atividade_fisica,
        bebida_quantidade: acolhidoParam.bebida_quantidade,
        bebida_periodicidade: acolhidoParam.bebida_periodicidade,
        paroquia: acolhidoParam.paroquia,
        atividades_religiosas: acolhidoParam.atividades_religiosas,
        demanda: acolhidoParam.demanda,
        encaminhamento: acolhidoParam.encaminhamento,
        observacao: acolhidoParam.observacao,
        prioridade: acolhidoParam.prioridade,
        PessoaId: (pessoaRetorno)? pessoaRetorno.pessoaInstance.dataValues.id: null,
        ReligiaoId: (religiaoInstance)? religiaoInstance[0].dataValues.id : null
      }

      if(pessoaParam && pessoaParam.cpf)
        data.StatusId = 2

      let acolhidoInstance = await Acolhido.create( data, { queryOptions } )

      let AcolhidoId = acolhidoInstance.dataValues.id
      let medicamentoContinuoInstance
      let familiaresInstance
      if(medicamentos)
        medicamentoContinuoInstance = await models.MedicamentoContinuo.adicionaVarios(medicamentos, AcolhidoId, transaction)

      if(familiaresParam)
        familiaresInstance = await models.Familiar.adicionaVarios(familiaresParam, AcolhidoId, transaction)

      // await transaction.commit()
      return {
          pessoa: (pessoaParam)? pessoaRetorno.pessoaInstance.dataValues: null,
          endereco: (enderecoParam)? pessoaRetorno.enderecoInstance.dataValues: null,
          acolhido: acolhidoInstance.dataValues,
          familiares:(familiaresParam)? familiaresInstance.dataValues : null,
          medicamentoContinuo: (medicamentoContinuoInstance)? medicamentoContinuoInstance.dataValues : null
        }

    } catch (error) {
      await t.rollback();
      console.log("\n", error, "\n")
      throw util.checkError(error, modelName)
    }
  }

  Acolhido.edita = async function (models, param) {
    let {
      acolhidoParam = {},
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

    let queryOptions = {
      where: {
        id: acolhido.id
      }
    }
    
    let t = await sequelize.transaction({ autocommit: false })

    try {

      if(modelStatus.pesquisa(idStatus) == null)
        throw util.defineError(404, "Status não econtrado.")

      religiaoInstance = await models.Religiao.pesquisaOuAdiciona(religiaoParam, t)
      pessoaInstance = await models.Pessoa.edita(models, t, {
        pessoaParam,
        enderecoParam,
        cidadeParam,
        bairroParam
      })

      if (transaction)
        queryOptions.transaction = t
        
      if (!religiaoInstance ) {
          // transaction.rollback();
        return util.defineError(412, "Erro em religião")
      }
      
      if (!pessoaInstance ) {
        return util.defineError(412, "Erro em pessoa")
      }

      let data = {
        atividade_fisica: acolhidoParam.atividade_fisica,
        bebida_quantidade: acolhidoParam.bebida_quantidade,
        bebida_periodicidade: acolhidoParam.bebida_periodicidade,
        paroquia: acolhidoParam.paroquia,
        atividades_religiosas: acolhidoParam.atividades_religiosas,
        demanda: acolhidoParam.demanda,
        encaminhamento: acolhidoParam.encaminhamento,
        observacao: acolhidoParam.observacao,
        prioridade: acolhidoParam.prioridade,
        ReligiaoId: religiaoInstance[0].dataValues.id,
        StatusId: acolhidoParam.StatusId
      }
      let acolhidoInstance = await Acolhido.update({ data }, queryOptions)

      if(pessoa.cpf && !data.StatusId)
        data.StatusId = 2

      let acolhidoInstance = await Acolhido.update({data}, queryOptions)

      familiares.forEach(async familiar => {
        await models.Familiar.edita(familiar)
      });
      
      // await models.DoencaFamilia.adicionaVarios(doencaFamilia, AcolhidoId)
      await transaction.commit()
      return acolhidoInstance
    } catch (error) {
      await transaction.rollback();
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
      
      return preparaObj(acolhidoInstance.dataValues)
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
        raw:true,
        nest:true,
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

      let i = 0
      acolhidoInstance.map((e)=>{
        e = preparaObj(e, i)
        i++
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

  Acolhido.atualizaPessoa = async function (models, param, acolhidoInstance, t) {
    let queryOptions = {
      transaction: t
    }

    let pessoaInstance = null

    //param já com id
    if (Object.keys(pessoaParam).find(key => key == "id") != false)
      pessoaInstance = await Pessoa.edita(models, param, t)
    else
      pessoaInstance = await Pessoa.adiciona(models, param, t)

    acolhidoInstance.setPessoa(pessoaInstance, queryOptions)
  }

  Acolhido.atualizaReligiao = async function (Religiao, religiaoParam, acolhidoInstance, t) {
    let queryOptions = {
      transaction: t
    }
    let religiaoInstance = Religiao.pesquisaOuAdiciona(religiaoParam, t)

    acolhidoInstance.setEspecialidade(especialidadeInstance, queryOptions)
  }

  Acolhido.atualizaFamiliares = async function (){
    if (familiaresParam.length > 0) {
      familiaresInstance = await models.Familiar.adicionaVarios(familiaresParam, t)
      await acolhidoInstance.setFamiliares(familiaresInstance, { transaction: t })
    }
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

  async function cadastraAssociacoes(models, acolhidoInstance, param, t) {
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
    // let status = (pessoaParam && pessoaParam.cpf) ? 2 : 1
    
    // await acolhidoInstance.setStatus(status, { transaction: t })

    if (medicamentosParam != "") {
      let medicamentos = []

      medicamentosParam.split(",").forEach(element => {
        medicamentos.push(element)
      })

      medicamentoContinuoInstance = await models.MedicamentoContinuo.adicionaVarios(medicamentos, t)
      await acolhidoInstance.setMedicamentosContinuos(medicamentoContinuoInstance, { transaction: t })
    }


//  ARRANJO TECNICO
    return status

  }

  function valida(acolhido) {
    let {
      preferenciaAtendimento
    } = acolhido
    if (preferenciaAtendimento != null)
      return true

    throw util.defineError(412, "Erro em Acolhido")
  }

  function preparaObj(acolhidoRaw, i) {   
    acolhidoRaw.acolhido = {
      id: acolhidoRaw.id,
      atividade_fisica: acolhidoRaw.atividade_fisica,
      atividades_religiosas: acolhidoRaw.atividades_religiosas,
      bebida_quantidade: acolhidoRaw.bebida_quantidade,
      bebida_periodicidade: acolhidoRaw.bebida_periodicidade,
      demanda: acolhidoRaw.demanda,
      encaminhamento: acolhidoRaw.encaminhamento,
      numero_cigarros_por_dia: acolhidoRaw.numero_cigarros_por_dia,
      observacao: acolhidoRaw.observacao,
      paroquia: acolhidoRaw.paroquia,
      preferenciaAtendimento: acolhidoRaw.preferenciaAtendimento,
      prioridade: acolhidoRaw.prioridade,
      PessoaId: acolhidoRaw.PessoaId,
      ReligiaoId: acolhidoRaw.ReligiaoId,
      StatusId: acolhidoRaw.StatusId,
      updatedAt: acolhidoRaw.updatedAt,
      createdAt: acolhidoRaw.createdAt,
      Religiao: acolhidoRaw.Religiao,
      familiares: acolhidoRaw.familiares,
      doencasFamilia: acolhidoRaw.doencasFamilia,
      medicamentosContinuos: acolhidoRaw.medicamentosContinuos
    }
    
    delete acolhidoRaw.id
    delete acolhidoRaw.atividade_fisica
    delete acolhidoRaw.atividades_religiosas
    delete acolhidoRaw.bebida_quantidade
    delete acolhidoRaw.bebida_periodicidade
    delete acolhidoRaw.demanda
    delete acolhidoRaw.encaminhamento
    delete acolhidoRaw.numero_cigarros_por_dia
    delete acolhidoRaw.observacao
    delete acolhidoRaw.paroquia
    delete acolhidoRaw.preferenciaAtendimento
    delete acolhidoRaw.prioridade
    delete acolhidoRaw.PessoaId
    delete acolhidoRaw.ReligiaoId
    delete acolhidoRaw.StatusId
    delete acolhidoRaw.updatedAt
    delete acolhidoRaw.createdAt
    delete acolhidoRaw.Religiao
    delete acolhidoRaw.familiares
    delete acolhidoRaw.doencasFamilia
    delete acolhidoRaw.medicamentosContinuos
    
    if(i == 1)
      console.log(acolhidoRaw)
    
      return acolhidoRaw
  }

  return Acolhido;
};
