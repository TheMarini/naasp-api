'use strict';
const util = require('../util')
const modelName = "Voluntario"

module.exports = (sequelize, DataTypes) => {
  const Voluntario = sequelize.define('Voluntario', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    faixaEtariaAtendimento: DataTypes.STRING,
    EspecialidadeId: DataTypes.INTEGER,
    PessoaId: DataTypes.INTEGER,
    updatedAt: DataTypes.DATE,
    createdAt: DataTypes.DATE
  }, {freezeTableName: true});
  Voluntario.associate = function(models) {
    // associations can be defined here
    Voluntario.belongsTo(models.Especialidade, {foreignKey: 'EspecialidadeId'})
    Voluntario.belongsTo(models.Pessoa, {
      foreignKey: 'PessoaId'
    });
  };

  Voluntario.adiciona = async function (models, param) {
  
    let {
      enderecoParam          = {},
      cidadeParam            = {},
      bairroParam            = {},
      pessoaParam            = {},
      especialidadeParam     = "",
      faixaEtariaAtendimento = []
    } = param
    let t = await sequelize.transaction({type: sequelize.Transaction}) 
    let queryOptions = {transaction: t}
    
    if (!pessoaParam)
      return util.defineError(412, "Erro em Pessoa")

    if (!especialidadeParam)
      return util.defineError(412, "Erro em Especialidade")

    try {
      let especialidadeInstance = null
      let pessoaInstance        = null
      let voluntarioInstance    = null
      let faixaEtariaConcat     = ""

      for (let index = 0; index < faixaEtariaAtendimento.length; index++) {
        const element = faixaEtariaAtendimento[index];
        
        faixaEtariaConcat += element

        if(index < faixaEtariaAtendimento.length-1)
          faixaEtariaConcat += ","
      }

      voluntarioInstance = await Voluntario.create({
        faixaEtariaAtendimento: faixaEtariaConcat
      }, { queryOptions })

      especialidadeInstance = await models.Especialidade.pesquisaOuAdiciona(especialidadeParam, t)
      pessoaInstance = await models.Pessoa.adiciona(models, null, {
        pessoaParam,
        enderecoParam,
        cidadeParam,
        bairroParam
      })
  
      if (!pessoaInstance)
        throw util.defineError(500, "Erro em Pessoa")
      
      voluntarioInstance.setPessoa(pessoaInstance)
      voluntarioInstance.setEspecialidade(especialidadeInstance)
      
      await t.commit()
      // return {
      //   voluntario: voluntarioInstance.dataValues,
      //   pessoa: pessoaRetorno.pessoaInstance.dataValues,
      //   endereco: pessoaRetorno.enderecoInstance.dataValues
      // }
      return true
    } catch (error) {
      await t.rollback();
      console.log("\n", error, "\n")
      throw util.checkError(error, modelName)
    }
  }

  Voluntario.edita = async function (models, param) {
  
    let {
      endereco,
      cidade,
      bairro,
      pessoa,
      especialidade,
      voluntarioId
    } = param

    let queryOptions = {}
    let transaction = null
    // let transaction = await sequelize.transaction({type: sequelize.Transaction}) 

    try {
      
      let especialidadeInstance = await models.Especialidade.pesquisaOuAdiciona(especialidade, transaction)
      let pessoaInstance = await models.Pessoa.edita(models, transaction, {
        pessoa,
        endereco,
        cidade,
        bairro
      })
           
      if (!pessoaInstance)
      return util.defineError(412, "Erro em Pessoa")
      
      if (!especialidadeInstance)
      return util.defineError(412, "Erro em Especialidade")
      
      if(transaction)
        queryOptions.transaction = transaction
      
      queryOptions.where = {id: voluntarioId}

      let voluntarioInstance = await Voluntario.update({
        EspecialidadeId: especialidadeInstance[0].dataValues.id
      }, queryOptions)
      
      // await transaction.commit()
      return voluntarioInstance
    } catch (error) {
      // await transaction.rollback();
      console.log("\n", error, "\n")
      throw util.checkError(error, modelName)
    }
  }

  Voluntario.pesquisa = async function (models, id) {
    let {
      Pessoa,
      Endereco,
      Cidade,
      Bairro,
      Voluntario,
      Especialidade
    } = models

    try {
      let voluntarioInstance = await Voluntario.findByPk(id, {
        include: [{
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
          },
          {
            model: Especialidade,
            attributes: ['nome'],
            as: 'Especialidade'
          }
        ]
      })

      return preparaObj(voluntarioInstance.dataValues)
    } catch (error) {
      console.log("\n catch \n")
      throw util.checkError(error, modelName)
    }
  }

  Voluntario.lista = async function (models) {
    let {
      Pessoa,
      Endereco,
      Cidade,
      Bairro,
      Voluntario,
      Especialidade
    } = models
    
    try {
      let voluntarioArray = await Voluntario.findAll({
        raw: true,
        nest: true,
        include: [{
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
          },
          {
            model: Especialidade,
            attributes: ['nome'],
            as: 'Especialidade'
          }
        ]
      })
      voluntarioArray.map((e)=> {
        e = preparaObj(e)
      })
      console.log(voluntarioArray)
      return voluntarioArray
    } catch (error) {
      console.log("\n catch \n")
      throw util.checkError(error, modelName)
    }
  }

  Voluntario.deleta = async function (idParam, transaction) {
    let queryOptions = {
      where: {
        id: idParam
      }
    }
    
    if (transaction)
      queryOptions.transaction = transaction

    try {
      let voluntario = await Voluntario.destroy(queryOptions)
      return voluntario
    } catch (error) {
      console.log("\n catch \n")
      throw util.checkError(error, modelName)
    }
  }

  function preparaObj(voluntarioRaw) {
    voluntarioRaw.voluntario = {
      id: voluntarioRaw.id,
      faixaEtariaAtendimento: voluntarioRaw.faixaEtariaAtendimento,
      EspecialidadeId: voluntarioRaw.EspecialidadeId,
      PessoaId: voluntarioRaw.PessoaId,
      updatedAt: voluntarioRaw.updatedAt,
      createdAt: voluntarioRaw.createdAt,
      Especialidade: voluntarioRaw.Especialidade
    }

    delete voluntarioRaw.id
    delete voluntarioRaw.faixaEtariaAtendimento
    delete voluntarioRaw.EspecialidadeId
    delete voluntarioRaw.PessoaId
    delete voluntarioRaw.updatedAt
    delete voluntarioRaw.createdAt
    delete voluntarioRaw.Especialidade
    
    console.log(voluntarioRaw)

    return voluntarioRaw
  }
  return Voluntario;
};
