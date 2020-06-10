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
    alcoolismoFamilia: {
      type: DataTypes.STRING
    },
    atividadeFisica: {
      type: DataTypes.STRING
    },
    atividadesReligiosas: {
      type: DataTypes.STRING
    },
    bebidaQuantidade: {
      type: DataTypes.STRING
    },
    cigarroQuantidade: {
      type: DataTypes.INTEGER
    },
    condicoesMoradia:{
      type: DataTypes.STRING
    },
    demanda: {
      type: DataTypes.STRING
    },
    encaminhamento: {
      type: DataTypes.STRING
    },
    medicamentosFamilia: {
      type: DataTypes.STRING
    },
    observacao: {
      type: DataTypes.STRING
    },
    observacaoBeneficioGoverno: {
      type: DataTypes.STRING
    },
    paroquia: {
      type: DataTypes.STRING
    },
    preferenciaAtendimento: {
      allowNull: false,
      type: DataTypes.STRING
    },
    prioridade: {
      type: DataTypes.INTEGER
    },
    tipoBeneficioGoverno: {
      type: DataTypes.STRING
    },
    valorBeneficioGoverno:{
      type: DataTypes.DOUBLE
    },
    PessoaId: {
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
    Acolhido.hasMany(models.Familiar, {
      as:{
        singular: "Familiar",
        plural: "Familiares"
      }})
    Acolhido.hasMany(models.DoencaFamilia)
    Acolhido.hasMany(models.TentativaContato)
    Acolhido.hasMany(models.Sessao)
  };

  Acolhido.adiciona = async function (models, param) {
    let { 
      acolhidoParam,
      religiaoParam,
      familiaresParam = []
    } = param
    
    valida(acolhidoParam)

    let t = await sequelize.transaction({ autocommit: false })
    try {
      let queryOptions = {transaction: t}
      
      let acolhidoInstance = await Acolhido.create({
        alcoolismoFamilia: acolhidoParam.alcoolismoFamilia,
        atividadeFisica: acolhidoParam.atividadeFisica, 
        atividadesReligiosas: acolhidoParam.atividadesReligiosas, 
        bebidaQuantidade: acolhidoParam.bebidaQuantidade, 
        cigarroQuantidade: acolhidoParam.cigarroQuantidade,
        condicoesMoradia: acolhidoParam.condicoesMoradia,
        demanda: acolhidoParam.demanda, 
        encaminhamento: acolhidoParam.encaminhamento, 
        medicamentosFamilia: acolhidoParam.medicamentosFamilia, 
        observacao: acolhidoParam.observacao, 
        observacaoBeneficioGoverno: acolhidoParam.observacaoBeneficioGoverno, 
        paroquia: acolhidoParam.paroquia, 
        preferenciaAtendimento: acolhidoParam.preferenciaAtendimento,  
        prioridade: acolhidoParam.prioridade, 
        tipoBeneficioGoverno: acolhidoParam.tipoBeneficioGoverno, 
        valorBeneficioGoverno: acolhidoParam.valorBeneficioGoverno,
        StatusId: (param.pessoaParam.cpf != "")? 2 : 1
      }, queryOptions)

      await Acolhido.atualizaPessoa(models, param, acolhidoInstance, t)
      await Acolhido.atualizaFamiliares(models.Familiar, familiaresParam, acolhidoInstance, t)

      t.commit()
    } catch (error) {
      await t.rollback();
      console.log("\n", error, "\n")
      throw util.checkError(error, modelName)
    }
  }

  Acolhido.edita = async function (models, param) {
    let { 
      acolhidoParam,
      familiaresParam = []
    } = param
    
    valida(acolhidoParam)

    let t = await sequelize.transaction({ autocommit: false })
    try {
      let queryOptions = {
        transaction: t,
        where: {
          id: acolhidoParam.id
        },
        returning: true
      }
      
      let acolhidoInstance = await Acolhido.update({
        alcoolismoFamilia: acolhidoParam.alcoolismoFamilia,
        atividadeFisica: acolhidoParam.atividadeFisica, 
        atividadesReligiosas: acolhidoParam.atividadesReligiosas, 
        bebidaQuantidade: acolhidoParam.bebidaQuantidade, 
        cigarroQuantidade: acolhidoParam.cigarroQuantidade,
        condicoesMoradia: acolhidoParam.condicoesMoradia,
        demanda: acolhidoParam.demanda, 
        encaminhamento: acolhidoParam.encaminhamento, 
        medicamentosFamilia: acolhidoParam.medicamentosFamilia, 
        observacao: acolhidoParam.observacao, 
        observacaoBeneficioGoverno: acolhidoParam.observacaoBeneficioGoverno, 
        paroquia: acolhidoParam.paroquia, 
        preferenciaAtendimento: acolhidoParam.preferenciaAtendimento,  
        prioridade: acolhidoParam.prioridade, 
        tipoBeneficioGoverno: acolhidoParam.tipoBeneficioGoverno, 
        valorBeneficioGoverno: acolhidoParam.valorBeneficioGoverno,
        StatusId: (param.pessoaParam.cpf != "")? 2 : 1
      }, queryOptions)

      acolhidoInstance = acolhidoInstance[1][0]
      
      await Acolhido.atualizaPessoa(models, param, acolhidoInstance, t)
      await Acolhido.atualizaFamiliares(models.Familiar, familiaresParam, acolhidoInstance, t)
      
      await t.commit()
      return true
    } catch (error) {
      await t.rollback();
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
      Familiar
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
          as: 'Familiares'
        }]
      })
      
      return acolhidoInstance.dataValues
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
      Familiar
    } = models

    try {
      let acolhidoInstance = await Acolhido.findAll({
        include: [
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
          },
          {
            model: Religiao,
            attributes: ['nome'],
            as: 'Religiao'
          }]
        }, {
          model: Familiar,
          as: 'Familiares'
        }]
      })

      return acolhidoInstance
  
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

  Acolhido.atualizaPessoa = async function (models, param, acolhidoInstance, t) {
    let queryOptions = {
      transaction: t
    }

    let pessoaInstance = null

    //param já com id
    if (Object.keys(param.pessoaParam).find(key => key == "id"))
      pessoaInstance = await models.Pessoa.edita(models, param, t)
    else
      pessoaInstance = await models.Pessoa.adiciona(models, param, t)

    await acolhidoInstance.setPessoa(pessoaInstance, queryOptions)
  }

  Acolhido.atualizaFamiliares = async function (Familiar, familiaresParam, acolhidoInstance, t){
    let familiaresInstance = []
    let familiaresInsert = []
    
    for(let familiar of familiaresParam) {

      if ( Object.keys(familiar).find(key => key == "id") )
        familiaresInstance.push(await Familiar.edita(familiar, t))
      else
        familiaresInsert.push(familiar)
    }

    let aux = await Familiar.adicionaVarios(familiaresInsert, t)
    familiaresInstance = [...familiaresInstance, ...aux]
    
    await acolhidoInstance.setFamiliares(familiaresInstance, { transaction: t })
  }

  function valida(acolhidoParam) {
    let {
      preferenciaAtendimento
    } = acolhidoParam
    if (preferenciaAtendimento != null)
      return true

    throw util.defineError(412, "Erro em Acolhido")
  }

  return Acolhido;
};
